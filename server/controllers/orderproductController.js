const { OrderProduct } = require('../models/models');
const ApiError = require('../error/ApiError');

class OrderProductController {
    async create(req, res, next) {
        try {
            const { id_order, id_product, quantity_product } = req.body;

            const orderProduct = await OrderProduct.create({ id_order, id_product, quantity_product });

            return res.json(orderProduct);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        try {
            const orderProducts = await OrderProduct.findAll();
            return res.json(orderProducts);
        } catch (e) {
            next(ApiError.internalServerError(e.message));
        }
    }

    async getOne(req, res) {
        try {
            const { id } = req.params;
            const orderProduct = await OrderProduct.findOne({ where: { id } });

            if (!orderProduct) {
                return next(ApiError.notFound('OrderProduct not found'));
            }

            return res.json(orderProduct);
        } catch (e) {
            next(ApiError.internalServerError(e.message));
        }
    }
}

module.exports = new OrderProductController();
