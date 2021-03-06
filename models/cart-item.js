const Sequelize = require("sequelize");
const db = require("../utils/database");

const CartItem = db.define("cartItem", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  quantity: { type: Sequelize.INTEGER, allowNull: false },
});

module.exports = CartItem;
