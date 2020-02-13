const router = require('express').Router();
const controller = require('./controllers');

//Connect controller methods to their corresponding routes
router.get('/:id', controller.gallery.getOne); // no change

router.post('/', controller.gallery.insertOne); // implemented

// router.put('/', controller.gallery.updateOne); // not doing

// router.delete('/', controller.gallery.deleteOne); // not doing

module.exports = router;