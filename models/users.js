const { DataTypes } = require("sequelize");
const sequelize = require("../db/db");
const User = sequelize.define(
  "usuarios",
  {
    //modelo de usuarios
    idusuaio: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.CHAR(50),
      allowNull: false,
    },
    apellidos: {
      type: DataTypes.CHAR(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.CHAR(30),
      allowNull: false,
      unique: true,
    },
    pass: {
      type: DataTypes.CHAR(250),
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    tipo: {
      type: DataTypes.CHAR(20),
      allowNull: false,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = { User };
