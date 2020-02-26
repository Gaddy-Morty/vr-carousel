'use strict'

require('array.prototype.flatmap').shim();
const s3Export = require('./s3Export.js');

const { Client } = require('@elastic/elasticsearch');
const client = new Client({
  node: 'http://localhost:9200',
});

async function createIndex () {
  await client.indices.create({
    index: 'photos',
    body: { // the body of the index
      properties: {
        url_path: { type: 'text' },
        caption: { type: 'text' },
        space_type: { type: 'keyword' },
        order: { type: 'integer' },
        is_main: { type: 'boolean' },
        listing_id: { type: 'integer' },
      }
    }
  }, { ignore: [400] });
}

const createChunks = (dataset, start, size=10000) => {
  const storage = {};
  for (let file of dataset) {
    const key = file.Key.split('/')[0];
    if (storage[key] === undefined) {
      storage[key] = [ file.Key ];
    } else {
      storage[key].push(file.Key);
    }
  }

  const results = [];
  const samples = [
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

  let chunk = 0;
  do {
    // pick a random set from storage & a random photo from set
    const key = Object.keys(storage)[randomInt(0, Object.keys(storage).length)];
    const main = randomInt(0, storage[key].length);

    // build photo object (i.e. each user-generated photo + caption)
    for (let i = 0; i < storage[key].length; i += 1) {
      const photo = {};
      photo.url_path = storage[key][i];
      photo.caption = samples[randomInt(0, samples.length)];
      photo.space_type = '';
      photo.order = null;
      (i === main) ? photo.is_main = 1 : photo.is_main = 0;
      photo.listing_id = start;
      results.push(photo);
      chunk += 1;
    }
    start += 1;
  } while (chunk < size);

  return results; // return array of length size=10000 (default)

  function randomInt (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };
};

async function run () {
  const start = Math.pow(10, 7);
  const size = Math.pow(10, 5);
  const end = start + size;
  let currIndex = start;
  let bulkCalls = 0;

  while (currIndex < end) {
    const dataset = createChunks(s3Export.Contents, currIndex);
    const body = dataset.flatMap(doc => [
      { index: { _index: 'photos' } },
      doc // each array object
    ]);

    console.log(body.slice(0,2)); // use to verify progress

    const { body: bulkResponse } = await client.bulk({ refresh: false, body });

    // https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/bulk_examples.html
    if (bulkResponse.errors) {
      const erroredDocuments = [];
      // The items array has the same order of the dataset we just indexed.
      // The presence of the `error` key indicates that the operation
      // that we did for the document has failed.
      bulkResponse.items.forEach((action, i) => {
        const operation = Object.keys(action)[0];
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

    // wrapping code within `await new Promise` guarantees that this code block
    // executes only after the previous promise (i.e. client.bulk) is resolved
    await new Promise((resolve) => {
      bulkCalls += 1;
      currIndex += 1000; // each chunk contains 1000 listings, 10 photos each
      console.log('ListingId:', currIndex, 'Bulk API:', bulkCalls);
      resolve();
    });
  }
}

createIndex()
  .then(() => console.log('ES index created, adding data next!'))
  .then(() => run())
  .then(() => client.count({ index: 'photos' }))
  .then(({ body: count }) => console.log('ES index count:', count))
  .catch((err) => console.log(err));