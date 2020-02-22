'use strict'

require('array.prototype.flatmap').shim();
const data = require('./output.js');

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

const { Client } = require('@elastic/elasticsearch');
const client = new Client({
  node: 'http://localhost:9200',
});

async function createIndex () {
  await client.indices.create({
    index: 'listing',
    // the body of the index
    body: {
      // define how doc/fields are indexed
      mappings: {
        // sub-fields, can be any data type
        properties: {
          listings: {
            properties: {
              listing_id: { type: 'integer' },
              photos: {
                // nested indicates an array of objects
                type: 'nested',
                properties: {
                  url_path: { type: 'text' },
                  caption: { type: 'text' },
                  space_type: { type: 'keyword' },
                  is_main: { type: 'boolean' },
                }
              }
            }
          }
        }
      }
    }
  }, { ignore: [400] });
}

createIndex();

async function run () {
  // Now, the code to generate the photo object
  const allPhotos = createGalleries(data.Contents);
  let dataset = []; // body of the bulk API call
  const start = Math.pow(10, 7); // starting index, i.e. Math.pow(10, 7)
  const size = Math.pow(10, 2); // test run
  const end = start + size;
  let index = start;
  let bulkSize = 0; // limit to 10K per call, write ~10K times
  let bulkCount = 0; // track how many Bulk API calls we make
  
  while (index < end) {
    const galleries = Object.keys(allPhotos);
    const gallery = galleries[getRandomInt(0, galleries.length)];
    const photoIdx = getRandomInt(0, allPhotos[gallery].length);
    for (let i = 0; i < allPhotos[gallery].length; i += 1) {
      const photo = allPhotos[gallery][i];
      if (i === photoIdx) {
        photo.is_main = 1;
      } else {
        photo.is_main = 0;
      }
      photo.listing_id = index;
      dataset.push(photo);
      bulkSize += 1;
    }

    if (bulkSize >= 100) {
      // dataset is an array of objects
      // flatMap maps each element and flattens results into a new array
      // doc is each object with id/text/user/date
      const body = dataset.flatMap(doc => [
        {
          index: {
            _index: 'listing'
          }
        }, doc // each array object
      ]);
      // body should be a flattened array
      
      // reset closure variables
      dataset = [];
      bulkSize = 0;

      // pass object to bulk method
      // asynchronously store response
      const { body: bulkResponse } = await client.bulk({ refresh: false, body });
      await function () { bulkCount += 1; }();

      // error handling logic (from official documentation)
      if (bulkResponse.errors) {
        const erroredDocuments = [];
        // The items array has the same order of the dataset we just indexed.
        // The presence of the `error` key indicates that the operation
        // that we did for the document has failed.
        bulkResponse.items.forEach((action, i) => {
          const operation = Object.keys(action)[0]
          if (action[operation].error) {
            erroredDocuments.push({
              // If the status is 429 it means that you can retry the document,
              // otherwise it's very likely a mapping error, and you should
              // fix the document before to try it again.
              status: action[operation].status,
              error: action[operation].error,
              operation: body[i * 2],
              document: body[i * 2 + 1]
            });
          }
        });
        console.log(erroredDocuments);
      }
    }

    // Add the photo set for the next listing
    index += 1;
  }
  const { body: count } = await client.count({ index: 'listing' });
  // logs out the total index count
  console.log('Elasticsearch index count:', count, '\n', 'Bulk API calls:', bulkCount);
}

run().catch(console.log);

// (async function() {
//   for await (let asyncReturn of run()) {
//     asyncReturn.catch(console.log)
//   }
// })();
