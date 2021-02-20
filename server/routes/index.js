const taskItemsController = require('../controllers').taskitems;

module.exports = (app) => {
  app.get('/', (req, res) =>
    res.status(200).send({
      message: 'Welcome to the Todos API!',
    })
  );
  app.post('/api', taskItemsController.createTask.create);
  app.get('/api', taskItemsController.listTask.list);
  app.get('/api/reverse', taskItemsController.reverseTask.listReverse);
  app.get('/api/done', taskItemsController.doneTask.listDone);
  app.get('/api/undone', taskItemsController.undoneTask.listUndone);
  app.get('/api/:id', taskItemsController.retrieveTask.retrieve);
  app.put('/api/:id', taskItemsController.updateTask.update);
  app.delete('/api/:id', taskItemsController.deleteTask.destroy);
};
