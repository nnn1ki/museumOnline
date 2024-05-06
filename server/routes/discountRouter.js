const Router = require('express');
const router = new Router();
const discountController = require('../controllers/discountContriller');

router.post('/', discountController.create);
router.get('/', discountController.getAll);
router.get('/:id', discountController.getOne);


module.exports = router;