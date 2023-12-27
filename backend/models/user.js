const { DataTypes } = require('sequelize');
const sequelize = require('../db/conn');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    require: true,
  },

  email: {
    type: DataTypes.STRING,
    require: true,
  },

  password: {
    type: DataTypes.STRING,
    require: true,
  },

  isAdmin: {
    type: DataTypes.BOOLEAN,
    require: true,
  },

  bit: {
    type: DataTypes.BOOLEAN,
  }
});

module.exports = User;
