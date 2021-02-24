const TaskItem = require('../models').TaskItem;

const createTask = require('./taskitems/task.create');
const listTask = require('./taskitems/task.list');
const retrieveTask = require('./taskitems/task.retrieve');
const updateTask = require('./taskitems/task.update');
const deleteTask = require('./taskitems/task.delete');
// const reverseTask = require('./taskitems/task.reverse');
// const doneTask = require('./taskitems/task.done');
// const undoneTask = require('./taskitems/task.undone');
// const reverseDoneTask = require('./taskitems/task.reverseDone');
// const reverseUndoneTask = require('./taskitems/task.reverseUndone');

module.exports = {
  createTask,
  listTask,
  retrieveTask,
  updateTask,
  deleteTask,
  // reverseDoneTask,
  // reverseUndoneTask,
  // reverseTask,
  // doneTask,
  // undoneTask,
};
