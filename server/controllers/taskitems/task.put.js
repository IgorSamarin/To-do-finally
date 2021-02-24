const TaskItem = require('../../models').TaskItem;
const express = require('express');
const router = express.Router();


 
router.put('/:id', async (req, res) => {
    try {
      const task = req.body;
      if (!task.text && task.complete === undefined) {
        return res.status(400).send({
          message: 'Invalid Request Body',
        });
      }
      const todoTask = await TaskItem.findByPk(req.params.id);
      if (!todoTask) {
        return res.status(404).send({
          message: 'Item Not Found',
        });
      }
      await todoTask.update(task);
      res.status(200).send(todoTask);
    } catch (err) {
      console.log(err.message);
      res.status(400).send(err.message);
    }
  })
  module.exports = router;
