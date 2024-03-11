// const sequelize = require('../db')
// const {DataTypes} = require('sequelize')
//
// const User = sequelize.define('User', {
//     id_user: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false},
//     usernmae: {type: DataTypes.CHAR, allowNull: false}, //длина 255
//     email_user: {type: DataTypes.CHAR, allowNull: false},
//     password_user: {type: DataTypes.CHAR, allowNull: false},
//     role_user: {type: DataTypes.CHAR, allowNull: false},
//     addres_user: {type: DataTypes.CHAR, allowNull: false}
// })
//
// const Discount = sequelize.define('Discount', {
//     id_discount: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false},
//     id_user: {type: DataTypes.INTEGER},
//     discount_amount: {type: DataTypes.NUMBER, allowNull: false}, //тут length/precision = 2, scale = 2 - может повлиять
//     discount_terms: {type: DataTypes.INTEGER, allowNull: false}
// })
//
// const Order = sequelize.define('Order', {
//     id_order: {type: DataTypes.INTEGER, allowNull: false, primaryKey: true},
//     date_and_time: {type: DataTypes.TIME},
//     status: {type: DataTypes.CHAR, allowNull: false}, //длина чара 50
//     total_cost: {type: DataTypes.NUMBER},
//     id_shop: {type: DataTypes.INTEGER},
//     id_user: {type: DataTypes.INTEGER}
// })
//
// const Order_Product = sequelize.define('Order_Product', {
//     id_order_product: {type: DataTypes.INTEGER, allowNull: false, primaryKey: true},
//     id_order: {type: DataTypes.INTEGER},
//     id_product: {type: DataTypes.INTEGER},
//     quantity_product: {type: DataTypes.INTEGER, allowNull: false}
// })
//
// const Product = sequelize.define('Product', {
//     id_product: {type: DataTypes.INTEGER, allowNull: false, primaryKey: true},
//     title: {type: DataTypes.CHAR, allowNull: false},
//     description: {type: DataTypes.TEXT},
//     cost_product: {type: DataTypes.NUMBER, allowNull: false}, //длина - 10, скале - 2
//     quantity_in_stock: {type: DataTypes.INTEGER, allowNull: false},
//     id_shop: {type: DataTypes.INTEGER}
// })
//
// const Shop = sequelize.define('Shop', {
//     id_shop: {type: DataTypes.INTEGER, allowNull: false, primaryKey: true},
//     title_shop: {type: DataTypes.CHAR, allowNull: false}, // длина 255
//     address: {type: DataTypes.CHAR, allowNull: false}, // длина 255
//     cost_delivery: {type: DataTypes.NUMBER}, // длина 10 скале 2
//
// })
//
// // Определение связей
// User.hasMany(Discount, { foreignKey: 'id_user' });
// Discount.belongsTo(User, { foreignKey: 'id_user' });
//
// Shop.hasMany(Product, { foreignKey: 'id_shop' });
// Product.belongsTo(Shop, { foreignKey: 'id_shop' });
//
// User.hasMany(Order, { foreignKey: 'id_user' });
// Order.belongsTo(User, { foreignKey: 'id_user' });
//
// Shop.hasMany(Order, { foreignKey: 'id_shop' });
// Order.belongsTo(Shop, { foreignKey: 'id_shop' });
//
// Order.hasMany(Order_Product, { foreignKey: 'id_order' });
// Order_Product.belongsTo(Order, { foreignKey: 'id_order' });
//
// Product.hasMany(Order_Product, { foreignKey: 'id_product' });
// Order_Product.belongsTo(Product, { foreignKey: 'id_product' });
//
// module.exports = {
//     User,
//     Discount,
//     Order,
//     Product,
//     Order_Product,
//     Shop
// }


const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('User', {
    id_user: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING, allowNull: false },
    email_user: { type: DataTypes.STRING, allowNull: false },
    password_user: { type: DataTypes.STRING, allowNull: false },
    role_user: { type: DataTypes.STRING, allowNull: false },
    address_user: { type: DataTypes.STRING, allowNull: false },
}, {
    tableName: 'User', // явное указание имени таблицы
    timestamps: false
});

const Shop = sequelize.define('Shop', {
    id_shop: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title_shop: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },
    cost_delivery: { type: DataTypes.DECIMAL, defaultValue: 0 },
}, {
    timestamps: false,
    tableName: 'Shop' // явное указание имени таблицы
});

const Product = sequelize.define('Product', {
    id_product: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    cost_product: { type: DataTypes.DECIMAL, allowNull: false },
    quantity_in_stock: { type: DataTypes.INTEGER, allowNull: false },
    id_shop: { type: DataTypes.INTEGER }
}, {
    timestamps: false,
    tableName: 'Product' // явное указание имени таблицы
});

const Order = sequelize.define('Order', {
    id_order: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    date_and_time: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    status: { type: DataTypes.STRING, allowNull: false },
    total_cost: { type: DataTypes.DECIMAL, allowNull: false },
    id_shop: { type: DataTypes.INTEGER },
    id_user: { type: DataTypes.INTEGER }
}, {
    timestamps: false,
    tableName: 'Order'
});

const Order_Product = sequelize.define('Order_Product', {
    id_order_product: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_order: { type: DataTypes.INTEGER },
    id_product: { type: DataTypes.INTEGER },
    quantity_product: { type: DataTypes.INTEGER, allowNull: false },
}, {
    timestamps: false,
    tableName: 'Order_Product' // явное указание имени таблицы
});

const Discount = sequelize.define('Discount', {
    id_discount: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    discount_amount: { type: DataTypes.DOUBLE, allowNull: false },
    discount_terms: { type: DataTypes.INTEGER, allowNull: false },
}, {
    timestamps: false,
    tableName: 'Discount' // явное указание имени таблицы
});

// Определение связей
Discount.belongsTo(User, { foreignKey: 'id_user' });
User.hasMany(Discount, { foreignKey: 'id_user' });

Order.belongsTo(Shop, { foreignKey: 'id_shop' });
Shop.hasMany(Order, { foreignKey: 'id_shop' });

Order.belongsTo(User, { foreignKey: 'id_user' });
User.hasMany(Order, { foreignKey: 'id_user' });

Order_Product.belongsTo(Order, { foreignKey: 'id_order' });
Order.hasMany(Order_Product, { foreignKey: 'id_order', onDelete: 'CASCADE' });

Order_Product.belongsTo(Product, { foreignKey: 'id_product' });
Product.hasMany(Order_Product, { foreignKey: 'id_product' });

Order.belongsTo(Shop, { foreignKey: 'id_shop' });
Shop.hasMany(Order, { foreignKey: 'id_shop' });

Product.belongsTo(Shop, { foreignKey: 'id_shop' });
Shop.hasMany(Product, { foreignKey: 'id_shop' });

module.exports = {
    User,
    Shop,
    Product,
    Order,
    Order_Product,
    Discount,
};
