const Task = require('../../models').Task;
const express = require('express');
const router = express.Router();

router.get('/user/:userId/tasks', async (req, res) => {
  try {
    const filter = {
      order:
        req.query.chronology === 'reverse'
          ? [['createdAt']]
          : [['createdAt', 'DESC']],
      where: {
        UserId: parseInt(req.params.userId),
      },
    };
    if (req.query.complete)
      filter.where =
        req.query.complete === 'true'
          ? { complete: true, UserId: parseInt(req.params.userId) }
          : { complete: false, UserId: parseInt(req.params.userId) };

    const result = await Task.findAll(filter);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
module.exports = router;
