'use strict';
const sequelize = require('./../../db');
const { DataTypes } = require('sequelize');
const Task = require('./task');
const bcrypt = require('bcrypt');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      this.setDataValue(
        'password',
        bcrypt.hashSync(value, bcrypt.genSaltSync(8), null)
      );
    },
  },
})

User.hasMany(Task);
Task.belongsTo(User);

module.exports = User;
