const router = require('express').Router();
const controllers = require('./controllers/escontrollers.js');

//Connect controller methods to their corresponding routes
router.get('/listings/:listingId/photos', controllers.getAll);
router.post('/listings/:listingId/photos', controllers.insertOne);
router.patch('/listings/:listingId/photos', controllers.updateOne);
router.delete('/listings/:listingId/photos', controllers.deleteOne);

module.exports = router;