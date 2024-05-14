const Router = require('express');
const router = new Router();
const discountRouter = require('./discountRouter');

const productRouter = require('./categoryRouter');

router.use('/category', productRouter);
router.use('/user', userRouter);
router.use('/excursion', orderRouter);
router.use('/exhibits', discountRouter);
router.use('/exhibitionOrder', discountRouter);

module.exports = router;