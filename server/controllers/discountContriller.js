const { Discount } = require('../models/models');
const ApiError = require('../error/ApiError');

class DiscountController {
    async create(req, res, next) {
        try {
            const { id_user, discount_amount, discount_terms } = req.body;

            const discount = await Discount.create({ id_user, discount_amount, discount_terms });

            return res.json(discount);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        try {
            const discounts = await Discount.findAll();
            return res.json(discounts);
        } catch (e) {
            next(ApiError.internalServerError(e.message));
        }
    }

    async getOne(req, res) {
        try {
            const { id } = req.params;
            const discount = await Discount.findOne({ where: { id } });

            if (!discount) {
                return next(ApiError.notFound('Discount not found'));
            }

            return res.json(discount);
        } catch (e) {
            next(ApiError.internalServerError(e.message));
        }
    }
}

module.exports = new DiscountController();
