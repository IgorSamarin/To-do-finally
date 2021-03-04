const Task = require('../../models').Task;
const express = require('express');
const router = express.Router();
router.get('/user/:userId/task/:id', async (req, res) => {
  try {
    const task = Task.findByPk(req.params.id);
    if (!task) {
      return res.status(404).send({
        message: 'Item Not Found!',
      });
    }
    res.status(200).send(task);
  } catch (err) {
    res.status(400).send(err.message);
  }
});
module.exports = router;
