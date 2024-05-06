// const { DataTypes } = require('sequelize');
// const sequelize = require('../db');
//
// const User = sequelize.define('User', {
//     id_user: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     username: { type: DataTypes.STRING, allowNull: false },
//     email_user: { type: DataTypes.STRING, allowNull: false },
//     password_user: { type: DataTypes.STRING, allowNull: false },
//     role_user: { type: DataTypes.STRING, allowNull: false },
//     address_user: { type: DataTypes.STRING, allowNull: false },
// }, {
//     tableName: 'User', // явное указание имени таблицы
//     timestamps: false
// });
//
// const Shop = sequelize.define('Shop', {
//     id_shop: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     title_shop: { type: DataTypes.STRING, allowNull: false },
//     address: { type: DataTypes.STRING, allowNull: false },
//     cost_delivery: { type: DataTypes.DECIMAL, defaultValue: 0 },
// }, {
//     timestamps: false,
//     tableName: 'Shop' // явное указание имени таблицы
// });
//
// const Product = sequelize.define('Product', {
//     id_product: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     title: { type: DataTypes.STRING, allowNull: false },
//     description: { type: DataTypes.TEXT },
//     cost_product: { type: DataTypes.DECIMAL, allowNull: false },
//     quantity_in_stock: { type: DataTypes.INTEGER, allowNull: false },
//     id_shop: { type: DataTypes.INTEGER }
// }, {
//     timestamps: false,
//     tableName: 'Product' // явное указание имени таблицы
// });
//
// const Order = sequelize.define('Order', {
//     id_order: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     date_and_time: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
//     status: { type: DataTypes.STRING, allowNull: false },
//     total_cost: { type: DataTypes.DECIMAL, allowNull: false },
//     id_shop: { type: DataTypes.INTEGER },
//     id_user: { type: DataTypes.INTEGER }
// }, {
//     timestamps: false,
//     tableName: 'Order'
// });
//
// const Order_Product = sequelize.define('Order_Product', {
//     id_order_product: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     id_order: { type: DataTypes.INTEGER },
//     id_product: { type: DataTypes.INTEGER },
//     quantity_product: { type: DataTypes.INTEGER, allowNull: false },
// }, {
//     timestamps: false,
//     tableName: 'Order_Product' // явное указание имени таблицы
// });
//
// const Discount = sequelize.define('Discount', {
//     id_discount: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     discount_amount: { type: DataTypes.DOUBLE, allowNull: false },
//     discount_terms: { type: DataTypes.INTEGER, allowNull: false },
// }, {
//     timestamps: false,
//     tableName: 'Discount' // явное указание имени таблицы
// });
//
// // Определение связей
// Discount.belongsTo(User, { foreignKey: 'id_user' });
// User.hasMany(Discount, { foreignKey: 'id_user' });
//
// Order.belongsTo(Shop, { foreignKey: 'id_shop' });
// Shop.hasMany(Order, { foreignKey: 'id_shop' });
//
// Order.belongsTo(User, { foreignKey: 'id_user' });
// User.hasMany(Order, { foreignKey: 'id_user' });
//
// Order_Product.belongsTo(Order, { foreignKey: 'id_order' });
// Order.hasMany(Order_Product, { foreignKey: 'id_order', onDelete: 'CASCADE' });
//
// Order_Product.belongsTo(Product, { foreignKey: 'id_product' });
// Product.hasMany(Order_Product, { foreignKey: 'id_product' });
//
// Order.belongsTo(Shop, { foreignKey: 'id_shop' });
// Shop.hasMany(Order, { foreignKey: 'id_shop' });
//
// Product.belongsTo(Shop, { foreignKey: 'id_shop' });
// Shop.hasMany(Product, { foreignKey: 'id_shop' });
//
// module.exports = {
//     User,
//     Shop,
//     Product,
//     Order,
//     Order_Product,
//     Discount,
// };

const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Category = sequelize.define('Category', {
    Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Name: { type: DataTypes.TEXT, allowNull: false },
    Description: { type: DataTypes.TEXT, allowNull: false }
});

const Excursion = sequelize.define('Excursion', {
    Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Name: { type: DataTypes.TEXT, allowNull: false },
    Description: { type: DataTypes.TEXT, allowNull: false }
});

const Exhibits = sequelize.define('Exhibits', {
    Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Name: { type: DataTypes.TEXT, allowNull: false },
    Description: { type: DataTypes.TEXT, allowNull: false },
    Year_of_production: { type: DataTypes.INTEGER, allowNull: false },
    Manufacturer: { type: DataTypes.TEXT, allowNull: false },
    CategoryId: { type: DataTypes.INTEGER, allowNull: false },
    Photo: { type: DataTypes.TEXT, allowNull: false },
    ModelPath: { type: DataTypes.TEXT, allowNull: false }
});

const ExhibitionOrder = sequelize.define('ExhibitionOrder', {
    Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    ExcursionId: { type: DataTypes.INTEGER, allowNull: false },
    ExhibitsId: { type: DataTypes.INTEGER, allowNull: false },
    Order: { type: DataTypes.INTEGER, allowNull: false }
});

const User = sequelize.define('User', {
    Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.TEXT, allowNull: false },
    email_user: { type: DataTypes.TEXT, allowNull: false },
    password_user: { type: DataTypes.TEXT, allowNull: false },
    role_user: { type: DataTypes.TEXT, allowNull: false },
    address_user: { type: DataTypes.TEXT, allowNull: false }
});


// Определение связей
Category.hasMany(Exhibits, { foreignKey: 'CategoryId' });
Exhibits.belongsTo(Category, { foreignKey: 'CategoryId' });

ExhibitionOrder.belongsTo(Excursion, { foreignKey: 'ExcursionId' });
ExhibitionOrder.belongsTo(Exhibits, { foreignKey: 'ExhibitsId' });


module.exports = {
    Category,
    Excursion,
    Exhibits,
    ExhibitionOrder,
    User,
    Discount
};

