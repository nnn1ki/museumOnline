const Router = require('express');
const router = new Router();

const categoryRouter = require('./categoryRouter');
const userRouter = require('./userRouter');
const excursionRouter = require('./excursionRouter');
const exhibitsRouter = require('./exhibitsRouter');
const exhibitionOrderRouter = require('./exhibitionOrderRouter');

router.use('/category', categoryRouter);
router.use('/user', userRouter);
router.use('/excursion', excursionRouter);
router.use('/exhibits', exhibitsRouter);
router.use('/exhibitionOrder', exhibitionOrderRouter);

module.exports = router;