// const sequelize = require("../db");
// const {DataTypes} = require("sequelize");
// const Category = sequelize.define('Category', {
//     Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     Name: { type: DataTypes.TEXT, allowNull: false },
//     Description: { type: DataTypes.TEXT, allowNull: false }
// });

const { Category, Order_Product, Order} = require('../models/models');
const ApiError = require('../error/ApiError');
const sequelize = require("../db");
const {DataTypes} = require("sequelize");

class CategoryController {

    async create(req, res) {
        try {
            const { Name, Description } = req.body;

            const category = await Category.create({ Name, Description });

            return res.json(category);
        } catch (e) {
            console.log("Ошибка создания связи Эя-Эт - ", e);
            // next(ApiError.badRequest(e.message));
        }
    }

    async updateCategory(req, res){
    //обновление информации категории
    }

    async deleteCategory(req) {
        const { id } = req.params;

        // console.log("id_order - ", id);
        // console.log("req.params - ", req.params);
        // console.log("req.body - ", req.body);
        if (!id) return console.log("Нет данных для удаления категории");

        try {
            await Category.destroy({where: {id_order: id}});
            // await Order.destroy({ where: { id_order: id } });
        } catch (e) {
            console.log("Не удалось удалить категорию", e);
        }
    }


}

module.exports = new CategoryController();