const { DataTypes } = require('sequelize');
const { isLowercase } = require('validator');
const { sequelize } = require('../postgress/postgres');

const Auth = sequelize.define('Auth', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        isLowercase: true,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
});


module.exports = Auth;