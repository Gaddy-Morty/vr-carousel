const router = require('express').Router();
const controller = require('./controllers');

//Connect controller methods to their corresponding routes
router.get('/:id', controller.gallery.getOne); // use existing model

router.post('/', controller.gallery.insertOne); // new method and model

// router.put('/', controller.gallery.updateOne); // define functionality 1st

router.delete('/', controller.gallery.deleteOne); // new method and model

module.exports = router;