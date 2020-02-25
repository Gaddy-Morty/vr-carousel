const { esclient } = require('../db/index.js');

// Create Elasticsearch access methods
module.exports = {
  getAll: (listingId, callback) => {
    esclient.search({
      index: 'photos',
      body: {
        query: {
          match: { listing_id: listingId }
        }
      }
    })
      .then((data) => callback(null, data))
      .catch((err) => callback(err));
  },

  insertOne: (listingId, data, callback) => {
    data.listing_id = listingId;
    esclient.index({
      index: { _index: 'photos' },
      body: data
    })
      .then((data) => callback(null, data))
      .catch((err) => callback(err));
  },

  updateOne: (listingId, photoId, data, callback) => {
    data.listing_id = listingId;
    esclient.update({
      index: 'photos',
      id: photoId,
      body: {
        doc: data
      }
    })
      .then((data) => callback(null, data))
      .catch((err) => callback(err));
  },

  deleteOne: (listingId, id, callback) => {
    // ES node client method
      // promise chain
        // cb invocation
  }
};