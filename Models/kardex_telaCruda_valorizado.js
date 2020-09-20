const { Sequelize, Op, Model, DataTypes } = require("sequelize");
const { sequelize } = require('../db');

const KardexModel = sequelize.define("kardex_telaCruda_valorizado", {
  id: {
    autoIncrement: true,
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
  },
  fechaRegistro: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  fechaRegistroBD: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  NIC: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
  OCST: {
    type: DataTypes.STRING(10),
    allowNull: true,
  },
  numeroGuia: {
    type: DataTypes.STRING(12),
    allowNull: true,
    field: "nguia",
  },
  codigoTransaccion: {
    type: DataTypes.CHAR(2),
    allowNull: true,
  },
  codigoAlmacen: {
    type: DataTypes.CHAR(3),
    allowNull: true,
  },
  codigoTelaCruda: {
    type: DataTypes.STRING(10),
    allowNull: true,
  },
  codigoFamilia: {
    type: DataTypes.STRING(10),
    allowNull: true,
  },
  observacion: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  partida: {
    type: DataTypes.STRING(15),
    allowNull: true,
  },
  guiaIngreso: {
    type: DataTypes.STRING(12),
    allowNull: true,
  },
  guiaSalida: {
    type: DataTypes.STRING(12),
    allowNull: true,
  },
  codigoProveedorCompra: {
    type: DataTypes.STRING(5),
    allowNull: true,
    field: "codProvCompra",
  },
  ingresoKg: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  ingresoRollos: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  ingresoPrecioArticulo: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  ingresoPrecioFamilia: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  salidaKg: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  salidaRollos: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  salidaPrecioArticulo: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  salidaPrecioFamilia: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  saldoKgArticulo: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  saldoRollosArticulo: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  saldoPrecioArticulo: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  ordenArticulo: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  saldoKgFamilia: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  saldoRollosFamilia: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  saldoPrecioFamilia: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  ordenFamilia: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  ingresoPrecioArticuloSol: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  salidaPrecioArticuloSol: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  saldoPrecioArticuloSol: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
}, {
  sequelize,
  tableName: "kardex_telaCruda_valorizado",
  // schema: "dbo",
  timestamps: false,
});

module.exports = { KardexModel };
