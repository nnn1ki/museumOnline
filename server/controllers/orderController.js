const { Order, Shop, Order_Product, Product} = require('../models/models');
const ApiError = require('../error/ApiError');
const {Op, where} = require("sequelize");

class OrderController {
    async create(req, res, next) {
        try {
            const { basket, id_user } = req.body;

            console.log(basket);


            if (!Array.isArray(basket) || basket.length === 0) {
                throw new Error('Basket should be a non-empty array.');
            }

            const totalCost = basket.reduce((total, item) => total + (item.cost_product * item.quantity), 0);
            console.log("итоговая стоимость заказа - ", totalCost);

            // Создание записи в таблице Order
            const order = await Order.create({
                status: "Pending",
                total_cost: totalCost,
                id_shop:  basket[0].id_shop,
                id_user: id_user,
            });

            // Создание записей в таблице Order_Product
            const orderProductsPromises = basket.map(item =>
                Order_Product.create({
                    id_order: order.id_order,
                    id_product: item.id_product,
                    quantity_product: item.quantity,
                })
            );

            await Promise.all(orderProductsPromises);

            res.json({ success: true });
        } catch (e) {
            console.log("Ошибка на create - ", e);
            // next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        try {
            const orders = await Order.findAll();
            return res.json(orders);
        } catch (e) {
            console.log("Ошибка на getAll - ", e);
            // next(ApiError.internalServerError(e.message));
        }
    }

    async getOne(req, res) {
        try {
            const { id } = req.params;
            const order = await Order.findOne({ where: { id } });

            if (!order) {
                console.log("Order not found");
                // return next(ApiError.notFound('Order not found'));
            }

            return res.json(order);
        } catch (e) {
            console.log("Ошибка на getOne - ", e);
            // next(ApiError.internalServerError(e.message));
        }
    }


    async getOrderByUser(req, res) {
        try {
            const { id_user } = req.params;

            const orders = await Order.findAll({
                where: { id_user: id_user },
                include: [
                    {
                        model: Shop,
                        attributes: ['id_shop', 'title_shop', 'cost_delivery'],
                    },
                    {
                        model: Order_Product,
                        attributes: ['quantity_product'],
                        include: [
                            {
                                model: Product,
                                attributes: ['title', 'cost_product'],
                            },
                        ],
                    },
                ],
            });

            if (!orders) {
                console.log("Orders not found");
            }

            return res.json(orders);
        } catch (e) {
            console.log("Error in getOrderByUser - ", e);
        }
    }

    async deleteOrder(req) {
        const { id } = req.params;

        console.log("id_order - ", id);
        console.log("req.params - ", req.params);
        console.log("req.body - ", req.body);
        if (!id) return console.log("Нет данных для удаления");

        try {
            await Order_Product.destroy({where: {id_order: id}});
            await Order.destroy({ where: { id_order: id } });
        } catch (e) {
            console.log("Не удалось удалить заказ", e);
        }
    }

}

module.exports = new OrderController();
