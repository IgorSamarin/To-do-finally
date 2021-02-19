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
  retrieve(req, res) {
    return TaskItem.findByPk(req.params.id)
      .then((todo) => {
        if (!todo) {
          return res.status(404).send({
            message: 'Todo Not Found',
          });
        }
        return res.status(200).send(todo);
      })
      .catch((error) => res.status(400).send(error));
  },
  update(req, res) {
    return TaskItem.findByPk(req.params.id)
      .then((task) => {
        if (!task) {
          return res.status(404).send({
            message: 'Item Not Found',
          });
        }
        return task
          .update({
            text: req.body.text || task.text,
            complete:
              req.body.complete === undefined
                ? task.complete
                : req.body.complete,
          })
          .then((updatedTaskItem) => {
            res.status(200).send(updatedTaskItem);
          })
          .catch((err) => res.status(400).send(err));
      })
      .catch((err) => res.status(400).send(err));
  },
  destroy(req, res) {
    return TaskItem.findByPk(req.params.id)
      .then((task) => {
        if (!task) {
          return res.status(404).send({
            message: 'Item Not Found',
          });
        }
        return task
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(204).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};
