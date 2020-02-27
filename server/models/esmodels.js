const { client } = require('../db/index.js');

module.exports = {
  getAll: (listingId, callback) => {
    client.search({
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
    client.index({
      index: 'photos',
      body: data
    })
      .then((res) => callback(null, res))
      .catch((err) => callback(err));
  },

  updateOne: (photoId, data, callback) => {
    client.update({
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
    client.delete({
      id: photoId,
      index: 'photos'
    })
      .then((res) => callback(null, res))
      .catch((err) => callback(err));
  }
};
