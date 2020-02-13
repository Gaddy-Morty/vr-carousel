const mongoose = require('mongoose');
// const mongoUrl = 'mongodb://database/gallery';
const mongoUrl = 'mongodb://localhost/gallery';
const GalleryModel = require('../db');

mongoose.connect(mongoUrl, { server: { reconnectTries: Number.MAX_VALUE } });

module.exports = {
  gallery: {
    insertOne: (gallery, cb) => {
      const galleryInstance = new GalleryModel(gallery);
      galleryInstance.save()
        .then((data) => {
          cb(null, data);
        })
        .catch((err) => {
          cb(err);
        });
    },

    insertAll: (data, cb) => {
      GalleryModel.insertMany(data)
        .then((docs) => {
          cb(null, docs);
        })
        .catch((err) => {
          cb(err);
        });
    },

    getOne: (id, cb) => {
      GalleryModel.find({ listing_id: Number(id) })
        .then((result) => {
          cb(null, result);
        })
        .catch((err) => {
          cb(err);
        });
    },

    getAll: (cb) => {
      GalleryModel.find({})
        .then((results) => {
          cb(null, results);
        })
        .catch((err) => {
          cb(err);
        });
    },

    deleteAll: () => {
      GalleryModel.deleteMany({})
        .then((results) => {
          cb(null, results);
        })
        .catch((err) => {
          cb(err);
        });
    },
  },
};
