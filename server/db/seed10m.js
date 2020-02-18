const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const data = require('./photos.js');

const listingsCsv = createCsvWriter({
  path: './server/db/listings.csv',
  header: [
    {
      id: 'listing_id', 
      title: 'listing_id'
    },
  ],
});

// may need to add a photo.id for indexing
const photosCsv = createCsvWriter({
  path: './server/db/photos.csv',
  header: [
    {
      id: 'url_path', 
      title: 'url_path'
    },
    {
      id: 'caption', 
      title: 'caption'
    },
    {
      id: 'space_type', 
      title: 'space_type'
    },
    {
      id: 'is_main', 
      title: 'is_main'
    },
    {
      id: 'listing_id', 
      title: 'listing_id'
    },
  ],
  append: true,
});

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

const captions = [
  "Beautiful shades permeate this home",
  "Equipped with everything you need",
  "Have your rest in tranquil ambiance",
  "Interesting things to do abound here",
  "A perfect space for your next vacation",
  "Enjoy quality time with your family",
  "The palette is balanced yet 'colorful'",
  "An architect and interior designer dream",
  "Natural light illuminates the space",
  "Ready for you, your family, and friends",
  "Make this place your own -- you're welcome",
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
    photos[gallery].push(photo);
  }
  return photos;
};

const photos = createGalleries(data.Contents);

const addListingPhotos = (listingId, callback) => {
  const list = [];
  
  // select one gallery at random
  const galleries = Object.keys(photos);
  // pick a photo gallery randomly to add to a listing
  const galleryIdx = getRandomInt(0, galleries.length);
  const gallery = galleries[galleryIdx];

  // pick a photo to be the main photo in the listing
  const photoIdx = getRandomInt(0, photos[gallery].length);

  // add a listing_id to all photos in the gallery
  for (let i = 0; i < photos[gallery].length; i += 1) {
    const photo = photos[gallery][i];
    if (photoIdx === i) {
      photo.is_main = true;
    } else {
      photo.is_main = false;
    }
    photo.listing_id = listingId;
    list.push(photo);
  }
  callback(list);
};

// // Can't use because exceeds heap size
// const writesToCsv = [];
// for (let i = 10000000; i < 20000000; i += 1) {
//   addListingPhotos(i, (list) => {
//     const prom = photosCsv.writeRecords(list)
//       .then(() => {})
//       .catch((error) => { console.log('Error', error) });
//     writesToCsv[i] = prom;
//   });
// }
  
// Promise.all(writesToCsv)
//   .then(() => console.log('Promised ALL'))
//   .catch((err) => console.log(err));

const createListingIds = (start, size, callback) => {
  const end = start + size;
  const listings = [];
  let index = start;

  while (index < end) {
    listings.push({ listing_id: index });
    index += 1;
  }

  callback(listings);
};

// createListingIds(Math.pow(10, 7), Math.pow(10, 7), (listings) => {
//   listingsCsv.writeRecords(listings)
//     .then(() => { console.log('Wrote to CSV') })
//     .catch((error) => { console.log('Error', error) });
// });