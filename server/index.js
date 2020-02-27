// require('elastic-apm-node').start({ serviceName: 'vr-carousel' });
require('newrelic');
const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const compression = require('compression');
const port = 3000;
const router = require('./routes.js');
// const controllers = require('./controllers/index.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(compression());

app.use(express.static(path.join(__dirname, "../client/dist")));

// New APIs for SDC
app.all('/api/v2', function (req, res, next) {
  console.log('Accessing v2 API ...');
  next();
});
app.use('/api/v2', router);

// app.get('/legacy/gallery/:id', controllers.gallery.getOne);
// app.get('/legacy/gallery', controllers.gallery.getAll);
// app.post('/legacy/gallery', controllers.gallery.insertOne); // NEW
// app.post('/legacy/gallery', controllers.gallery.insertAll); // use existing model
// app.delete('/legacy/gallery', controllers.gallery.deleteOne); // private API
// app.delete('/legacy/gallery', controllers.gallery.deleteAll);  // private API

app.listen(port, () => console.log(`Server listening on port ${port}!`));
