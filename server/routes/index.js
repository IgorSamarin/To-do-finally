module.exports = (app) => {
  app.get('/', (req, res) =>
    res.status(200).send({
      message: 'Welcome to the Todos API!',
    })
  );

  const getTasks = require('./../controllers/taskitems/tasks.get');
  const getTask = require('./../controllers/taskitems/task.get');
  const postTask = require('./../controllers/taskitems/task.post');
  const putTask = require('./../controllers/taskitems/task.put');
  const deleteTask = require('./../controllers/taskitems/task.delete');

  app.use('/api', getTasks, putTask, postTask, deleteTask, getTask);
};
