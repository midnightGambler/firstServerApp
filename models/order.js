const Sequelize = require("sequelize");
const db = require("../utils/database");

module.exports = db.define("order", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});
