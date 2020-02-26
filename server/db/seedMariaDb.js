const { createWriteStream } = require('fs');
const { format } = require('fast-csv');
const data = require('./s3Export.js');

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

const captions = [
  "Warm sunlight throughout",
  "Everything you need is here",
  "Rest in tranquil ambiance",
  "Peek around this place",
  "Just... perfect",
  "Enjoy your time here",
  "Balanced yet 'colorful'",
  "An interior designer dream",
  "Natural light permeates",
  "Ready for you, YASS",
  "Stay -- you're welcome",
];

const createGalleries = (list) => {
  const photos = {};
  for (let i = 0; i < list.length; i += 1) {
    const gallery = list[i].Key.split('/')[0];
    if (photos[gallery] === undefined) {
      photos[gallery] = [];
    }
    // insert object with properties
    const photo = {};
    photo.url_path = list[i].Key;
    photo.caption = captions[getRandomInt(0, captions.length)];
    photo.space_type = '';
    photo.order = null;
    photos[gallery].push(photo);
  }
  return photos;
};

const photos = createGalleries(data.Contents);

const writePhotosCsv = (stream, start, size, callback) => {
  const end = start + size;
  let index = start;
  write();
  function write () {
    let ok = true;
    while (index < end && ok) {      
      const galleries = Object.keys(photos);
      const gallery = galleries[getRandomInt(0, galleries.length)];
      const photoIdx = getRandomInt(0, photos[gallery].length);
      for (let i = 0; i < photos[gallery].length; i += 1) {
        const photo = photos[gallery][i];
        if (i === photoIdx) {
          photo.is_main = 1;
        } else {
          photo.is_main = 0;
        }
        photo.listing_id = index;
        if (index === end - 1) {
          ok = stream.write(photo, callback);
        } else {
          ok = stream.write(photo);
        }
      }
      index += 1;
    }

    if (index < end) {
      stream.once('drain', write);
    }
  }
}

const writable = createWriteStream('./CSVs/photos.part1.csv');
const stream = format({ headers: true });
stream.pipe(writable);
// uncomment to generate a csv with photos
writePhotosCsv(stream, 10000000, 1000000, () => { stream.end() });
// writePhotosCsv(stream, 10000000, 5000000, () => { stream.end() });
// writePhotosCsv(stream, 15000000, 5000000, () => { stream.end() });

const createListingIds = (start, size) => {
  const end = start + size;
  const writable = createWriteStream('./CSVs/listings.csv');
  const stream = format({ headers: true });
  stream.pipe(writable);
  
  let index = start;
  while (index < end) {
    // this is an async operation
    stream.write({ id: index });
    index += 1;
  }
  stream.end();
};

// uncomment to generate a csv with listing ids
// createListingIds(Math.pow(10, 7), Math.pow(10, 7));
