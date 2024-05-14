// const ExhibitionOrder = sequelize.define('ExhibitionOrder', {
//     Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     ExcursionId: { type: DataTypes.INTEGER, allowNull: false },
//     ExhibitsId: { type: DataTypes.INTEGER, allowNull: false },
//     Count: { type: DataTypes.INTEGER, allowNull: false } //номер в очереди
// });

const { ExhibitionOrder } = require('../models/models');
const ApiError = require('../error/ApiError');
const sequelize = require("../db");
const {DataTypes} = require("sequelize");

class ExhibitionOrderController {
    async create(req, res) {
        try {
            const { ExcursionId, ExhibitsId, Count } = req.body;

            const exhibitationOrder = await ExhibitionOrderController.create({ ExcursionId, ExhibitsId, Count});

            return res.json(exhibitationOrder);
        } catch (e) {
            console.log("Ошибка создания связи Эя-Эт - ", e);
            // next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        try {
            const exhibitationOrder = await ExhibitionOrderController.findAll();
            return res.json(exhibitationOrder);
        } catch (e) {
            console.log("Ошибка поиска всех связей - ", e);
            // next(ApiError.internalServerError(e.message));
        }
    }

    async getOne(req, res) {
        try {
            const { id } = req.params; //возможно будем искать по другим id - экскурсии или экспоната
            const exhibitationOrder = await ExhibitionOrderController.findOne({ where: { id } });

            if (!exhibitationOrder) {
                console.log("Такого номера связи нет!");
                // return next(ApiError.notFound('OrderProduct not found'));
            }

            return res.json(exhibitationOrder);
        } catch (e) {
            console.log("Ошибка поиска связи по айди - ", e);
            // next(ApiError.internalServerError(e.message));
        }
    }
}

module.exports = new ExhibitionOrderController();
