const TaskItem = require('../models').TaskItem;

const createTask = require('./taskitems/task.create');
const listTask = require('./taskitems/task.list');
const reverseTask = require('./taskitems/task.reverse');
const doneTask = require('./taskitems/task.done');
const undoneTask = require('./taskitems/task.undone');
const retrieveTask = require('./taskitems/task.retrieve');
const updateTask = require('./taskitems/task.update');
const deleteTask = require('./taskitems/task.delete');

module.exports = {
  createTask,
  listTask,
  reverseTask,
  doneTask,
  undoneTask,
  retrieveTask,
  updateTask,
  deleteTask,
};
