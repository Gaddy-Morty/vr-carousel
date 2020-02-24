const mongoose = require('mongoose');
// const mongoUrl = 'mongodb://database/gallery';
const { Client } = require('@elastic/elasticsearch');
const esclient = new Client({
  node: 'http://localhost:9200',
});

const GallerySchema = mongoose.Schema({
  listing_id: { type: Number, required: true, unique: true },
  listing_title: { type: String },
  listing_images: [{ id: Number, url: String, caption: String }],
});

module.exports.GalleryModel = mongoose.model('Gallery', GallerySchema);
module.exports.esclient = esclient;
