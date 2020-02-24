const models = require('../models');

module.exports = {
  gallery: {
    // legacy
    getOne: (req, res) => {
      const id = req.params.id;
      models.gallery.getOne(id, (err, results) => {
        if (err) {
          console.log(err);
        } else {
          res.json(results);
        }
      });
    },

    // legacy
    getAll: (req, res) => {
      models.gallery.getAll((err, results) => {
        if (err) {
          console.log(err);
        } else {
          res.json(results);
        }
      });
    },

    // legacy extension
    insertOne: (req, res) => {
      const gallery = req.body;
      models.gallery.insertOne(gallery, (err, results) => {
        if (err) {
          console.log(err);
        } else {
          res.json(results);
        }
      });
    },

    // legacy
    insertAll: (req, res) => {
      models.gallery.insertAll(data, (err, results) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).send(results);
        }
      });
    },

    // legacy extension
    deleteOne: (req, res) => {
      const id = req.params.id;
      models.gallery.deleteOne(id, (err, results) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).send(results);
        }
      });
    },

    // legacy
    deleteAll: (req, res) => {
      models.gallery.deleteAll((err, results) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).send(results);
        }
      });
    },
  },
};
