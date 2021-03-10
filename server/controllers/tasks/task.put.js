const Task = require('../../models').Task;
const express = require('express');
const router = express.Router();
const authorization = require('../../middleware/authMiddleware');

router.put('/user/:userId/task/:id', authorization, async (req, res) => {
  if (req.decoded) {
    try {
      const task = req.body;
      if (!task.text && task.complete === undefined) {
        return res.status(400).send({
          message: 'Invalid Request Body',
        });
      }
      const todoTask = await Task.findByPk(req.params.id);
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
  } else {
    res.status(401).send({ message: 'Not auth' });
  }
});
module.exports = router;
