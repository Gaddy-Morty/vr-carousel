const models = require('../models/esmodels.js');

module.exports = {
  getAll: (req, res) => {
    const { listingId } = req.params;
    models.getAll(listingId, (err, data) => {
      if (err) {
        console.log(`Elasticsearch getAll error: ${err}`);
      } else {
        const photos = data.body.hits.hits;
        res.status(200).send(photos);
      }
    });
  },

  insertOne: (req, res) => {
    const { listingId } = req.params;
    const { body } = req;
    models.insertOne(listingId, body, (err, data) => {
      if (err) {
        console.log(`Elasticsearch insertOne error: ${err}`);
      } else {
        res.send(data);
      }
    });
  },

  updateOne: (req, res) => {
    const { photoId } = req.params;
    const { body } = req;
    models.updateOne(photoId, body, (err, data) => {
      if (err) {
        console.log(`Elasticsearch updateOne error: ${err}`);
      } else {
      res.send(data);
      }
    });
  },

  deleteOne: (req, res) => {
    const { photoId } = req.params;
    models.deleteOne(photoId, (err, data) => {
      if (err) {
        console.log(`Elasticsearch deleteOne error: ${err}`);
      } else {
        res.send(data);
      }
    });
  }
};
