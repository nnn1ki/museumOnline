const { Product } = require('../models/models');
const ApiError = require('../error/ApiError');
const {Op} = require("sequelize");

class ProductController {
    async create(req, res, next) {
        try {
            const { title, description, cost_product, quantity_in_stock, id_shop } = req.body;

            const product = await Product.create({ title, description, cost_product, quantity_in_stock, id_shop });

            return res.json(product);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res, next) {
        try {

            const products = await Product.findAll();
            // console.log('Products:', products);
            return res.json(products);
        } catch (e) {
            console.error('Error fetching products:', e);
            // next(ApiError.internalServerError(e.message));
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            const product = await Product.findOne({ where: { id } });

            if (!product) {
                return next(ApiError.notFound('Product not found'));
            }

            return res.json(product);
        } catch (e) {
            // next(ApiError.internalServerError(e.message));

            console.log(e);
            next();
        }
    }

    async searchProducts(req, res, next) {
        try {
            const { title } = req.params;
            const product = await Product.findAll({ where: { title: { [Op.like]: `%${title}%` } } });


            if (!product) {
                return next(ApiError.notFound('Product not found'));
            }

            return res.json(product);
        } catch (e) {
            console.error('Error fetching products:', e);
            next();
            // next(ApiError.internalServerError(e.message));
        }
    }
}

module.exports = new ProductController();
