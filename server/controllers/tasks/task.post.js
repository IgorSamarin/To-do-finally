const TaskItem = require('../../models').TaskItem;
const express = require('express');
const router = express.Router();

router.post('', async (req, res) => {
  try {
    if (!req.body) throw new Error(400);
    if (!req.body.text) throw new Error(400);
    const task = await TaskItem.create({
      text: req.body.text,
      complete: false,
    });
    res.status(201).send(task);
  } catch (err) {
    res.status(400).send(err.message);
  }
});
module.exports = router;
