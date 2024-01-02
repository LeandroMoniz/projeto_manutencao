const { DataTypes } = require('sequelize');
const sequelize = require('../db/conn');

const Office = sequelize.define('Office', {
    cargo: {
        type: DataTypes.STRING,
        require: true,
    },
    valorHora: {
        type: DataTypes.INTEGER,
        require: true,
    },
    idUser: {
        type: DataTypes.INTEGER,
        require: true,
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        require: true,
    },
    bit: {
        type: DataTypes.BOOLEAN,
        require: true,
    }
});

module.exports = Office;