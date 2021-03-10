const Task = require('../../models').Task;
const express = require('express');
const router = express.Router();
const authorization = require('../../middleware/authMiddleware');

router.post('/user/:userId/tasks', authorization, async (req, res) => {
  if (req.decoded) {
    try {
      if (!req.body || !req.body.text) throw new Error(400);
      const task = await Task.create({
        text: req.body.text,
        complete: false,
        UserId: req.params.userId,
      });
      res.status(201).send(task);
    } catch (err) {
      res.status(400).send(err.message);
    }
  } else {
    res.status(401).send({ message: 'Not auth' });
  }
});
module.exports = router;
