const TaskItem = require('../models').TaskItem;

module.exports = {
  create:async (req,res)=>{
    try {
      if (!req.body) throw new Error(400);
      if (!req.body.text) throw new Error(400);
      const task = await TaskItem.create({
        text: req.body.text,
        complete: false,
      });
      res.status(201).send(task);
    } catch (err) {
      res.status(400).send(err);
    }
  
  },
  list: async (req, res) => {
    try {
      const tasks = await TaskItem.findAll({
        order: [['createdAt', 'DESC']],
      });
      res.status(200).send(tasks);
    } catch (err) {
      res.status(400).send(err);
    }
  },
  listReverse: async (req, res) => {
    try {
      const tasks = await TaskItem.findAll({
        order: [['createdAt']],
      });
      res.status(200).send(tasks);
    } catch (err) {
      res.status(400).send(err);
    }
  },
  listDone: async (req, res) => {
    try {
      const tasks = await TaskItem.findAll({
        where: {
          complete: 'true',
        },
        order: [['createdAt', 'DESC']],
      });
      res.status(200).send(tasks);
    } catch (err) {
      res.status(400).send(err);
    }
  },
  listUndone: async (req, res) => {
    try {
      const tasks = await TaskItem.findAll({
        where: {
          complete: 'false',
        },
        order: [['createdAt', 'DESC']],
      });
      res.status(200).send(tasks);
    } catch (err) {
      res.status(400).send(err);
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
