const Task = require('../../models').Task;
const express = require('express');
const router = express.Router();
const authorization = require('../../middleware/authMiddleware');

router.delete('/user/:userId/task/:id', authorization, async (req, res) => {
  if (req.decoded) {
    try {
      const { id } = req.params;
      const todoTask = await Task.destroy({ where: { id } });
      if (!todoTask) {
        return res.status(404).send({
          message: 'Item Not Found',
        });
      }
      res.status(204).send();
    } catch (err) {
      res.status(500).send(err.message);
    }
  } else {
    res.status(401).send({ message: 'Not auth' });
  }
});
module.exports = router;
