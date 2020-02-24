const router = require('express').Router();
const controllers = require('./controllers/escontrollers.js');

//Connect controller methods to their corresponding routes
router.get('/', controllers.getAll);
router.get('/:id', controllers.getOne);
router.post('/', controllers.insertOne);
router.post('/', controllers.updateOne);
router.delete('/', controllers.deleteOne);

module.exports = router;