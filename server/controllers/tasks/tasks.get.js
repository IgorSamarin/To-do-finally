const Task = require('../../models').Task;
const express = require('express');
const router = express.Router();

router.get('/user/:id/tasks', async (req, res) => {
  try {
    const filter = {
      order:
        req.query.chronology === 'reverse'
          ? [['createdAt', 'DESC']]
          : [['createdAt']],
    };
    if (req.query.complete)
      filter.where =
        req.query.complete === 'true'
          ? { complete: true }
          : { complete: false };

    const result = await Task.findAll(filter);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
module.exports = router;
