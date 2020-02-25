const bodyParser = require('body-parser');
const morgan = require('morgan');
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const controllers = require('./controllers');
const cors = require('cors');
// const seedDb = require('./db/seed.js'); // seed DB every time server runs
const router = require('./routes.js');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, "../client/dist")));

app.get('/legacy/gallery/:id', controllers.gallery.getOne);
app.get('/legacy/gallery', controllers.gallery.getAll);
app.post('/legacy/gallery', controllers.gallery.insertOne); // NEW
app.post('/legacy/gallery', controllers.gallery.insertAll); // use existing model
// app.delete('/legacy/gallery', controllers.gallery.deleteOne); // private API
// app.delete('/legacy/gallery', controllers.gallery.deleteAll);  // private API

// New APIs for SDC
app.all('/api/v2', function (req, res, next) {
  console.log('Accessing v2 API ...');
  next();
});
app.use('/api/v2', router);

app.listen(port, () => console.log(`Server listening on port ${port}!`));
