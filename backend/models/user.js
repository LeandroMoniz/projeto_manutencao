const { DataTypes } = require('sequelize');
const sequelize = require('../db/conn');
//models
const Office = require('./office');

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

  cargo: {
    type: DataTypes.INTEGER,
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


Office.hasMany(User);
User.belongsTo(Office);

module.exports = User;
