const Task = require('../../models').Task;
const express = require('express');
const router = express.Router();

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const todoTask = await Task.destroy({ where: { id } });
    if (!todoTask) {
      return res.status(404).send({
        message: 'Item Not Found',
      });
    }
    res.status(204);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
module.exports = router;
