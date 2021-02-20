const taskItemsController = require('../controllers').taskitems;

module.exports = (app) => {
  app.get('/', (req, res) =>
    res.status(200).send({
      message: 'Welcome to the Todos API!',
    })
  );
  app.post('/api', taskItemsController.create);
  app.get('/api', taskItemsController.list);
  app.get('/api/reverse', taskItemsController.listReverse);
  app.get('/api/done', taskItemsController.listDone);
  app.get('/api/undone', taskItemsController.listUndone);
  app.get('/api/:id', taskItemsController.retrieve);
  app.put('/api/:id', taskItemsController.update);
  app.delete('/api/:id', taskItemsController.destroy);
};
