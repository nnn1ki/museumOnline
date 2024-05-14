const Router = require('express');
const router = new Router();
const categoryController = require('../controllers/categoryController');

router.post('/', categoryController.create);
router.post('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);


module.exports = router;