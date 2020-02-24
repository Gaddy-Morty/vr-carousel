const models = require('../models/esmodels.js');

// Create req-res controller methods
module.exports = {
  getAll: (req, res) => {
    // call db method for getAll
      // callback, error first
      // callback, data
        res.send(`this is from getAll`)
  },

  getOne: (req, res) => {
    const { id } = req.params;
    // call db method for getOne
      // callback, error first
      // callback, data
        res.send(`this id from getOne: ${id}`)
  },

  insertOne: (req, res) => {
    const { body } = req;
    // call db method for insertOne
      // callback, error first
      // callback, data
        res.send(`insertOne! ${body}`)
  },

  updateOne: (req, res) => {
    const { body } = req;
    // call db method for updateOne
      // callback, error first
      // callback, data
        res.send(`updateOne! ${body}`)
  },

  deleteOne: (req, res) => {
    const { _id } = req.body;
    // call db method for deleteOne
      // callback, error first
      // callback, data
        res.send(`deleteOne! ${_id}`)
  }
};