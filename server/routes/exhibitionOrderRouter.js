const Router = require('express');
const router = new Router();
const exhibitionOrderController = require('../controllers/exhibitionOrderController');

router.post('/', exhibitionOrderController.create);
router.get('/', exhibitionOrderController.getAll);
router.get('/:id', exhibitionOrderController.getById);
router.delete('/:id', exhibitionOrderController.deleteExhibitionOrder);

module.exports = router;