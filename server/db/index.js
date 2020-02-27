const mongoose = require('mongoose');
// const mongoUrl = 'mongodb://database/gallery'; // for docker-compose

const { Client } = require('@elastic/elasticsearch');
const host = process.env.ES_HOST || 'localhost';
const esclient = new Client({ host: { host, 9200 } });

const mariadb = require('mariadb');
const pool = mariadb.createPool({
     host: '127.0.0.1', 
     user:'gabrielsong',
     database: 'vacayhome',
     password: ''
});

async function asyncFunction() {
  let conn;
  try {
    conn = await pool.getConnection();
    console.log(`connected ! connection id is ${conn.threadId}`);
  } catch (err) {
	  throw err;
  } finally {
	  if (conn) return conn.end();
  }
}

const GallerySchema = mongoose.Schema({
  listing_id: { type: Number, required: true, unique: true },
  listing_title: { type: String },
  listing_images: [{ id: Number, url: String, caption: String }],
});

module.exports.GalleryModel = mongoose.model('Gallery', GallerySchema);
module.exports.esclient = esclient;
module.exports.pool = pool;