// Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
// Name: { type: DataTypes.TEXT, allowNull: false },
// Description: { type: DataTypes.TEXT, allowNull: false }

const { Excursion, ExhibitionOrder } = require('../models/models'); //получаем экскурсию и связь с экспонатами
const {Op, where, DataTypes} = require("sequelize");
const ApiError = require("../error/ApiError");

class ExcursionController {
    // создание новой экскурсии
    async create(req, res){
        try {
            const { name, description } = req.body; //получаем от пользователя

            const excursion = await Excursion.create({ name, description });

            return res.json(excursion);
        } catch (e) {
            console.log("Плохой запрос на создание новой Экскурсии - ", e);
            // next(ApiError.badRequest(e.message));
        }
    }

    // удаление информации об экскурсии
    async deleteExcursion(req){
        const { id } = req.params;

        // console.log("id_order - ", id);
        // console.log("req.params - ", req.params);
        // console.log("req.body - ", req.body);
        if (!id) return console.log("Нет данных для удаления");

        try {
            await Excursion.destroy({where: {id: id}}); // удаляем саму экскурсию из таблиц экскурсий
            await ExhibitionOrder.destroy({ where: { ExcursionId: id } }); // удаляем все связи с экспонатами
        } catch (e) {
            console.log("Не удалось удалить экскурсию", e);
        }
    }

    //обновление информации о самой экскурсии и ее содержании
    async update(req, res){

    }

    // получение всех экскурсий
    async getAll(req, res){
        try {
            const excursion = await Excursion.findAll();
            return res.json(excursion);
        } catch (e) {
            console.log("Ошибка getAll в Экскурсии - ", e);
        }
    }

    //получение по айди
    async getById(req, res){
        try {
            const { id } = req.params;
            const excursion = await Excursion.findOne({ where: { id } });

            if (!excursion) {
                console.log("Order not found");
            }

            return res.json(excursion);
        } catch (e) {
            console.log("Ошибка на getById в экскрсии - ", e);
        }
    }
}

module.exports = new ExcursionController();