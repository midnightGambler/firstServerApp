const Sequelize = require("sequelize");
const {
  SCHEMA_NAME,
  SCHEMA_USER_NAME,
  SCHEMA_PASSWORD,
  SCHEMA_SETTINGS,
} = require("../schema/settings");

const sequelize = new Sequelize(
  SCHEMA_NAME,
  SCHEMA_USER_NAME,
  SCHEMA_PASSWORD,
  SCHEMA_SETTINGS
);

module.exports = sequelize;
