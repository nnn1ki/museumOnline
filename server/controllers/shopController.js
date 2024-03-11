const { Shop } = require('../models/models');
const ApiError = require('../error/ApiError');

class ShopController {
    async create(req, res, next) {
        try {
            const { title_shop, address, cost_delivery } = req.body;

            const shop = await Shop.create({ title_shop, address, cost_delivery });

            return res.json(shop);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        try {
            const shops = await Shop.findAll();
            return res.json(shops);
        } catch (e) {
            next(ApiError.internalServerError(e.message));
        }
    }

    async getOne(req, res) {
        try {
            const { id } = req.params;
            const shop = await Shop.findOne({ where: { id } });

            if (!shop) {
                return next(ApiError.notFound('Shop not found'));
            }

            return res.json(shop);
        } catch (e) {
            next(ApiError.internalServerError(e.message));
        }
    }
}

module.exports = new ShopController();
