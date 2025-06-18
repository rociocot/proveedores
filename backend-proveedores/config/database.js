const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('proveedores', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
