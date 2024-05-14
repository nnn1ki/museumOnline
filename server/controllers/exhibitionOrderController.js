// const ExhibitionOrder = sequelize.define('ExhibitionOrder', {
//     Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     ExcursionId: { type: DataTypes.INTEGER, allowNull: false },
//     ExhibitsId: { type: DataTypes.INTEGER, allowNull: false },
//     Count: { type: DataTypes.INTEGER, allowNull: false } //номер в очереди
// });

const { ExhibitionOrder} = require('../models/models');
const ApiError = require('../error/ApiError');
const sequelize = require("../db");
const {DataTypes} = require("sequelize");

class ExhibitionOrderController {
    async create(req, res) {
        try {
            const { ExcursionId, ExhibitsId, Count } = req.body;

            const exhibitionOrder = await ExhibitionOrderController.create({ ExcursionId, ExhibitsId, Count});

            return res.json(exhibitionOrder);
        } catch (e) {
            console.log("Ошибка создания связи Эя-Эт - ", e);
            // next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        try {
            const exhibitionOrder = await ExhibitionOrderController.findAll();
            return res.json(exhibitionOrder);
        } catch (e) {
            console.log("Ошибка поиска всех связей - ", e);
            // next(ApiError.internalServerError(e.message));
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params; //возможно будем искать по другим id - экскурсии или экспоната
            const exhibitionOrder = await ExhibitionOrderController.findOne({ where: { id } });

            if (!exhibitionOrder) {
                console.log("Такого номера связи нет!");
                // return next(ApiError.notFound('OrderProduct not found'));
            }

            return res.json(exhibitionOrder);
        } catch (e) {
            console.log("Ошибка поиска связи по айди - ", e);
            // next(ApiError.internalServerError(e.message));
        }
    }

    async deleteExhibitionOrder(req, res){
        const { id } = req.params;

        // console.log("id_order - ", id);
        // console.log("req.params - ", req.params);
        // console.log("req.body - ", req.body);
        if (!id) return console.log("Нет данных для удаления связи");

        try {
            await ExhibitionOrder.destroy({where: {id_order: id}});
            // await Order.destroy({ where: { id_order: id } });
        } catch (e) {
            console.log("Не удалось удалить категорию", e);
        }
    }
}

module.exports = new ExhibitionOrderController();
