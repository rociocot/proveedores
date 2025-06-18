// models/Proveedor.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Proveedor = sequelize.define('Proveedor', {
  ID_proveedor: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: DataTypes.STRING,
  apellido: DataTypes.STRING,
  localidad: DataTypes.STRING,
  telefono: DataTypes.STRING,
  mail: DataTypes.STRING,
}, {
  tableName: 'proveedores',
  timestamps: false
});

module.exports = Proveedor;
