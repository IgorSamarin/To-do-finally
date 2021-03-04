const Task = require('../../models').Task;
const express = require('express');
const router = express.Router();

router.post('/user/:userId/tasks', async (req, res) => {
  try {
    if (!req.body  || !req.body.text) throw new Error(400);
    const task = await Task.create({
      text: req.body.text,
      complete: false,
      UserId: req.params.userId
    });
    res.status(201).send(task);
  } catch (err) {
    res.status(400).send(err.message);
  }
});
module.exports = router;
