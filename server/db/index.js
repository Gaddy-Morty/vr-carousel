const { Client } = require('@elastic/elasticsearch');
const hostname = process.env.ES_HOST || 'localhost';
const client = new Client({
  node: `http://${hostname}:9200`,
  log: 'error'
});

async function checkConnection () {
  let isConnected = false;
  console.log('Connecting to host', hostname);
  try {
    const health = await client.cluster.health({});
    console.log(health);
    isConnected = true;
  } catch (err) {
    console.log('process.env.ES_HOST', process.env.ES_HOST);
    console.log('Connection Failed\n', err);
  }
}

checkConnection();

module.exports.client = client;

// ###### MARIADB ######
// const mariadb = require('mariadb');
// const pool = mariadb.createPool({
//      host: '127.0.0.1', 
//      user:'gabrielsong',
//      database: 'vacayhome',
//      password: ''
// });

// async function asyncFunction() {
//   let conn;
//   try {
//     conn = await pool.getConnection();
//     console.log(`connected ! connection id is ${conn.threadId}`);
//   } catch (err) {
// 	  throw err;
//   } finally {
// 	  if (conn) return conn.end();
//   }
// }

// module.exports.pool = pool;

// ###### MONGODB ######
// const mongoose = require('mongoose');
// const mongoUrl = 'mongodb://database/gallery'; // for docker-compose

// const GallerySchema = mongoose.Schema({
//   listing_id: { type: Number, required: true, unique: true },
//   listing_title: { type: String },
//   listing_images: [{ id: Number, url: String, caption: String }],
// });

// module.exports.GalleryModel = mongoose.model('Gallery', GallerySchema);