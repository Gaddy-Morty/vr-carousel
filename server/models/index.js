const mongoose = require('mongoose');
// const mongoUrl = 'mongodb://database/gallery';
const mongoUrl = 'mongodb://localhost/gallery';
const { GalleryModel } = require('../db');

mongoose.connect(mongoUrl, { 
  server: { reconnectTries: Number.MAX_VALUE }, 
  useNewUrlParser: true 
});

module.exports = {
  gallery: {
    // legacy
    getOne: (id, cb) => {
      GalleryModel.find({ listing_id: Number(id) })
        .then((result) => {
          cb(null, result);
        })
        .catch((err) => {
          cb(err);
        });
    },

    // legacy
    getAll: (cb) => {
      GalleryModel.find({})
        .then((results) => {
          cb(null, results);
        })
        .catch((err) => {
          cb(err);
        });
    },

    // legacy extension
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

    // legacy
    insertAll: (data, cb) => {
      GalleryModel.insertMany(data)
        .then((docs) => {
          cb(null, docs);
        })
        .catch((err) => {
          cb(err);
        });
    },

    // legacy extension
    deleteOne: (id) => {
      GalleryModel.deleteOne({ listing_id: Number(id) })
        .then((results) => {
          cb(null, results);
        })
        .catch((err) => {
          cb(err);
        });
    },

    // legacy
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
