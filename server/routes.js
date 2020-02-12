const router = require('express').Router();
const controller = require('./controllers');

//Connect controller methods to their corresponding routes
router.get('/:id', controller.galleries.getGallery);

router.post('/', controller.galleries.postGallery);

router.put('/', controller.galleries.updateGallery);

router.delete('/', controller.galleries.deleteGallery);

module.exports = router;