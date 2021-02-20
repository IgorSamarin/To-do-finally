const TaskItem = require('../models').TaskItem;

module.exports = {
  create(req, res) {
    return TaskItem.create({
      text: req.body.text,
      complete: false,
    })
      .then((todoItem) => res.status(201).send(todoItem))
      .catch((error) => res.status(400).send(error));
  },
  list(req, res) {
    if (req.path == '/api') {
      // query string express
      // sequelize queries
      return TaskItem.findAll({
        order: [['createdAt', 'DESC']],
      })
        .then((tasks) => res.send(tasks))
        .catch((error) => res.send(error));
    } else if (req.path == '/api/reverse') {
      return TaskItem.findAll({
        order: [['createdAt']],
      })
        .then((tasks) => res.send(tasks))
        .catch((error) => res.send(error));
    } else if (req.path == '/api/done') {
      return TaskItem.findAll({
        where: {
          complete: 'true',
        },
        order: [['createdAt', 'DESC']],
      })
        .then((tasks) => res.send(tasks))
        .catch((error) => res.send(error));
    } else if (req.path == '/api/undone') {
      return TaskItem.findAll({
        where: {
          complete: 'false',
        },
        order: [['createdAt', 'DESC']],
      })
        .then((tasks) => res.send(tasks))
        .catch((error) => res.send(error));
    }
  },
  retrieve: async (req, res) => {
    try {
      const task = TaskItem.findByPk(req.params.id);
      if (!task) {
        return res.status(404).send({
          message: 'Item Not Found!',
        });
      }
      res.status(200).send(task);
    } catch (err) {
      res.status(400).send(err.message);
    }
  },

  update: async (req, res) => {
    try {
      const task = await TaskItem.findByPk(req.params.id);
      if (!task) {
        return res.status(404).send({
          message: 'Item Not Found',
        });
      }
      if (!req.body.text && req.body.complete === undefined) {
        return res.status(400).send({
          message: 'Invalid Request Body',
        });
      }
      task.update({
        text: req.body.text || task.text,
        complete:
          req.body.complete === undefined ? task.complete : req.body.complete,
      });
      res.status(200).send(task);
    } catch (err) {
      res.status(400).send(err.message);
    }
  },

  destroy: async (req, res) => {
    try {
      const task = await TaskItem.findByPk(req.params.id);
      if (!task) {
        return res.status(404).send({
          message: 'Item Not Found!',
        });
      }
      task.destroy();
      res.status(204).send();
    } catch (err) {
      res.status(400).send(err.message);
    }
  },
};
