const { pool } = require('../db/index.js');

module.exports = {
  getAll: (listingId, callback) => {
    return pool.query("SELECT * FROM photo WHERE listing_id = ?", [listingId])
      .then((rows) => {
        callback(null, rows);
      })
      .catch((err) => {
        callback(err);
      });
  },

  insertOne: (listingId, data, callback) => {
    return pool.query("INSERT INTO photo (url_path, caption, space_type, is_main, listing_id) VALUES (?, ?, ?, 0, ?)", [data.url_path, data.caption, data.space_type, listingId])
      .then((res) => {
        callback(null, res);
      })
      .catch((err) => {
        callback(err);
      });
  },

  updateOne: (photoId, data, callback) => {
    return pool.query("SELECT * FROM photo WHERE id = ?", [photoId])
      .then((rows) => {
        for (let key in rows[0]) {
          if (data[key] === undefined) {
            data[key] = rows[0][key];
          }
        }
        return pool.query(`UPDATE photo SET url_path = ?, caption = ?, space_type = ?, is_main = ? WHERE id = ?`, [data.url_path, data.caption, data.space_type, data.is_main, photoId])
      })
      .then((res) => {
        callback(null, res);
      })
      .catch((err) => {
        callback(err);
      });
  },

  deleteOne: (photoId, callback) => {
    return pool.query("DELETE FROM photo WHERE id = ?", [photoId])
      .then((res) => {
        callback(null, res);
      })
      .catch((err) => {
        callback(err);
      });
  }
};
