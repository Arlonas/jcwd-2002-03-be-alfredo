const { Sequelize } = require('sequelize');
const mysqlConfig = require('../config/database');

const sequelize = new Sequelize({
    username: mysqlConfig.MYSQL_USERNAME,
    password: mysqlConfig.MYSQL_PASSWORD,
    database: mysqlConfig.MYSQL_DB_NAME,
    port: 3306,
    dialect: 'mysql',
    logging: false,
});

// models
const Admin = require("../models/admin")(sequelize)
const Address = require("../models/address")(sequelize)
const Cart = require("../models/cart")(sequelize)
const Category = require("../models/categories")(sequelize)
const Inventory = require("../models/inventory")(sequelize)
const Product = require("../models/product")(sequelize)
const User = require("../models/user")(sequelize)
const VerificationToken = require('../models/verificationEmail')(sequelize);
const ForgotPasswordToken = require('../models/forgotPassword')(sequelize);
const Stock_order = require('../models/stock_order')(sequelize)
const Stock_opname = require("../models/stock_opname")(sequelize)
const Product_image = require("../models/product_image")(sequelize)
const Transaction = require("../models/transaction")(sequelize)
const Transaction_items = require("../models/transaction_items")(sequelize)
const Payment = require('../models/payment')(sequelize)

// Associations

// 1:M
Address.belongsTo(User)
User.hasMany(Address)

Product_image.belongsTo(Product)
Product.hasMany(Product_image)

Transaction_items.belongsTo(Transaction)
Transaction.hasMany(Transaction_items)
Transaction_items.belongsTo(Product)
Product.hasMany(Transaction_items)

Cart.belongsTo(User)
User.hasMany(Cart)
Cart.belongsTo(Product)
Product.hasMany(Cart)

// M:N
VerificationToken.belongsTo(User);
User.hasMany(VerificationToken);

ForgotPasswordToken.belongsTo(User);
User.hasMany(ForgotPasswordToken);

Stock_order.belongsTo(Product)
Product.hasMany(Stock_order)
Stock_order.belongsTo(Admin)
Admin.hasMany(Stock_order)

Payment.belongsTo(Admin)
Admin.hasMany(Payment)
Payment.belongsTo(Transaction)
Transaction.hasMany(Payment)

Stock_opname.belongsTo(Product)
Product.hasMany(Stock_opname)
Stock_opname.belongsToMany(Stock_order, { through: "buy_stock" })
Stock_opname.belongsToMany(Transaction, { through: "stock_sold" })

Inventory.belongsTo(Product)
Product.hasMany(Inventory)
Inventory.belongsTo(Transaction)
Transaction.hasMany(Inventory)

Category.belongsToMany(Product, { through: "product_category" })
module.exports = {
    Address,
    Admin,
    Cart,
    Category,
    Inventory,
    Product,
    User,
    sequelize,
    Stock_order,
    VerificationToken,
    ForgotPasswordToken
}