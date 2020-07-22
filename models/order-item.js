const Sequelize = require("sequelize");
const db = require("../utils/database");

module.exports = db.define("orderItem", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  quantity: { type: Sequelize.INTEGER, allowNull: false },
});
