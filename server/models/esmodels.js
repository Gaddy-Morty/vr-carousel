const { esclient } = require('../db/index.js');

// Create Elasticsearch access methods
module.exports = {
  getAll: (listingId, callback) => {
    console.log('logging esclient object', listingId);
    esclient.search({
      index: 'photos',
      body: {
        query: {
          match: { listing_id: listingId }
        }
      }
    })
      .then((data) => callback(null, data))
      .catch((err) => callback(err))
  },

  getOne: (listingId, id, callback) => {
    // ES node client method
      // promise chain
        // cb invocation
  },

  insertOne: (listingId, data, callback) => {
    // ES node client method
      // promise chain
        // cb invocation
  },

  updateOne: (listingId, data, callback) => {
    // ES node client method
      // promise chain
        // cb invocation
  },

  deleteOne: (listingId, id, callback) => {
    // ES node client method
      // promise chain
        // cb invocation
  }
};