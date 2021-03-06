const Sequelize = require("sequelize");
const db = require("../utils/database");

const Cart = db.define("cart", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
});

module.exports = Cart;
