const { Sequelize, Op, Model, DataTypes } = require("sequelize");

const sequelize = new Sequelize('task', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = { sequelize }