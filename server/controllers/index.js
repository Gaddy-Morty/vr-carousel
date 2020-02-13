const models = require('../models');

module.exports = {
  gallery: {
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

    getAll: (req, res) => {
      models.gallery.getAll((err, results) => {
        if (err) {
          console.log(err);
        } else {
          res.json(results);
        }
      });
    },

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

    insertAll: (req, res) => {
      models.gallery.insertAll(data, (err, results) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).send(results);
        }
      });
    },

    updateOne: (req, res) => {
      // get the body content
      // query mongo for that record
      // update that record to mongo
      // send success message in the response
      res.status(200).send(results);
    },

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

    deleteAll: (req, res) => {
      models.gallery.insertAll((err, results) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).send(results);
        }
      });
    },
  },
};
