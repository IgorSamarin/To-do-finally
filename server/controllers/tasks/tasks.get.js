const Task = require('../../models').Task;
const express = require('express');
const router = express.Router();
const authorization = require('../../middleware/authMiddleware');

router.get('/user/:userId/tasks', authorization, async (req, res) => {
  if (req.decoded) {
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
  } else {
    res.status(401).send({message:'Not auth'});
  }
});
module.exports = router;
