const models = require('../models');

module.exports = {
  gallery: {
    insertAll: (req, res) => {
      models.gallery.insertAll(data, (err, results) => {
        if (err) {
          console.log(err);
        } else {
          res.sendStatus(200);
        }
      });
    },

    getOne: (req, res) => {
      const id = req.params.id;
      models.gallery.getOne(id, (err, results) => {
        if (err) {
          console.log(err);
        } else {
          console.log(results);
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

    deleteAll: (req, res) => {
      models.gallery.insertAll((err, results) => {
        if (err) {
          console.log(err);
        } else {
          res.sendStatus(200);
        }
      });
    },
  },

  galleries: {
    getGallery: (req, res) => {
      const id = req.params.id;
      // query mongo for that record
      // send the record in the response
    },

    postGallery: (req, res) => {
      // get the body content
      // write that record to mongo
      // send success message in the response
    },

    updateGallery: (req, res) => {
      // get the body content
      // query mongo for that record
      // update that record to mongo
      // send success message in the response
    },

    deleteGallery: (req, res) => {
      // query mongo for that record
      // delete that record from mongo
      // send success message in the response
    },
  },
};
