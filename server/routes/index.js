const Router = require('express');
const router = new Router();
const productRouter = require('./productRouter');
const userRouter = require('./userRouter');
const orderRouter = require('./orderRouter');
const discountRouter = require('./discountRouter');

router.use('/product', productRouter);
router.use('/user', userRouter);
router.use('/order', orderRouter);
router.use('/discount', discountRouter);

module.exports = router;