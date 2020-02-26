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
      index: 'photos',
      body: data
    })
      .then((res) => callback(null, res))
      .catch((err) => callback(err));
  },

  updateOne: (photoId, data, callback) => {
    esclient.update({
      index: 'photos',
      id: photoId,
      body: {
        doc: data
      }
    })
      .then((res) => callback(null, res))
      .catch((err) => callback(err));
  },

  deleteOne: (photoId, callback) => {
    esclient.delete({
      id: photoId,
      index: 'photos'
    })
      .then((res) => callback(null, res))
      .catch((err) => callback(err));
  }
};
