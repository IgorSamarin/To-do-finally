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
    return TaskItem.findAll({ raw: true })
      .then((tasks) => res.send(tasks))
      .catch((error) => res.send(error));
  },
};
