const Task = require('../../models').Task;
const User = require('../../models').User;
const express = require('express');
const router = express.Router();
router.get('/users/:id', async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findOne({
      where: { id: userId },
    });
    if (!user) {
      return res.status(404).send({
        message: 'User Not Found!',
      });
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
