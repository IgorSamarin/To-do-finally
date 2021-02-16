'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TaskItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  TaskItem.init({
    complete: DataTypes.BOOLEAN,
    text: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TaskItem',
  });
  return TaskItem;
};