// const {DataTypes} = require("sequelize");
// Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
// Name: { type: DataTypes.TEXT, allowNull: false },
// Description: { type: DataTypes.TEXT, allowNull: false },
// Year_production: { type: DataTypes.INTEGER, allowNull: false },
// Manufacturer: { type: DataTypes.TEXT, allowNull: false },
// CategoryId: { type: DataTypes.INTEGER, allowNull: false },
// Photo: { type: DataTypes.TEXT, allowNull: false },
// ModelPath: { type: DataTypes.TEXT, allowNull: false }

const { Exhibits, Excursion, ExhibitionOrder} = require('../models/models'); //модель экспоната
const {Op, where} = require("sequelize");

class ExhibitsController {

    // создание новой экскурсии
    async create(req, res){ // будут проблемы с путем модели
        try {
            const { Name, Description, Year_production, Manufacturer, CategoryId, Photo, ModelPath  } = req.body;

            const excursion = await Exhibits.create({ Name, Description, Year_production, Manufacturer, CategoryId, Photo, ModelPath });

            return res.json(excursion);
        } catch (e) {
            console.log("Плохой запрос на создание новой Экскурсии - ", e);
            // next(ApiError.badRequest(e.message));
        }
    }

    // удаление информации об экспонате
    async deleteExhibits(req){
        const { id } = req.params;

        // console.log("id_order - ", id);
        // console.log("req.params - ", req.params);
        // console.log("req.body - ", req.body);
        if (!id) return console.log("Нет данных для удаления экспоната");

        try {
            await Exhibits.destroy({where: {id: id}}); // удаляем саму экскурсию из таблиц экскурсий
            await ExhibitionOrder.destroy({ where: { ExhibitsId: id } }); // удаляем все связи в таблице связей
        } catch (e) {
            console.log("Не удалось удалить экспонат - ", e);
        }
    }

    //обновление информации об экскурсии
    async update(req, res){

    }

    // получение всех экспонатов
    async getAll(req, res){
        try {
            const exhibits = await Exhibits.findAll();
            return res.json(exhibits);
        } catch (e) {
            console.log("Ошибка getAll в Экпоната - ", e);
        }
    }

    //получение по айди
    async getById(req, res){
        try {
            const { id } = req.params;
            const exhibits = await Exhibits.findOne({ where: { id } });

            if (!exhibits) {
                console.log("Экспонат не найден");
            }

            return res.json(exhibits);
        } catch (e) {
            console.log("Ошибка на getById в экспоната - ", e);
        }
    }

}

module.exports = new ExhibitsController();