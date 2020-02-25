const { esclient } = require('../db/index.js');

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
      refresh: 'true',
      body: data
    })
      .then((data) => callback(null, data))
      .catch((err) => callback(err));
  },

  updateOne: (photoId, data, callback) => {
    esclient.update({
      index: 'photos',
      id: photoId,
      refresh: 'true',
      body: {
        doc: data
      }
    })
      .then((data) => callback(null, data))
      .catch((err) => callback(err));
  },

  deleteOne: (photoId, callback) => {
    esclient.delete({
      id: photoId,
      index: 'photos',
      refresh: 'true'
    })
      .then((data) => callback(null, data))
      .catch((err) => callback(err));
  }
};