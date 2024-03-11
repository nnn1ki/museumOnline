const Router = require('express');
const router = new Router();
const orderController = require('../controllers/orderController');


router.post('/', orderController.create);
router.get('/', orderController.getAll);
router.get('/:id', orderController.getOne);
router.get('/getOrderByUser/:id_user', orderController.getOrderByUser);
router.delete('/deleteOrder/:id', orderController.deleteOrder);

module.exports = router;