const models = require('../models/esmodels.js');

// Create req-res controller methods
module.exports = {
  getAll: (req, res) => {
    const { listingId } = req.params;
    // call db method for getAll
    models.getAll(listingId, (err, data) => {
      // callback, error first
      if (err) {
        console.log(`Elasticsearch controller error: ${err}`)
      } else { // callback, data
        const photos = data.body.hits.hits;
        res.status(200).send(photos);
      }
    });
  },

  insertOne: (req, res) => {
    const { listingId } = req.params;
    const { body } = req;
    // call db method for insertOne
      // callback, error first
      // callback, data
        res.send(`insertOne! ${body}`)
  },

  updateOne: (req, res) => {
    const { listingId } = req.params;
    const { body } = req;
    // call db method for updateOne
      // callback, error first
      // callback, data
        res.send(`updateOne! ${body}`)
  },

  deleteOne: (req, res) => {
    const { listingId } = req.params;
    const { _id } = req.body;
    // call db method for deleteOne
      // callback, error first
      // callback, data
        res.send(`deleteOne! ${_id}`)
  }
};