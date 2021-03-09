const User = require('../../models').User;
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/user/login', async (req, res) => {
  try {
    if (!req.body.username || !req.body.password) {
      return res.status(400).send({ message: 'Invalid requset' });
    }
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    if (!user) {
      return res.status(400).send({ message: 'User dosnt exist' });
    }
    const { password } = user;
    if (!bcrypt.compareSync(req.body.password, password)) {
      return res.status(400).send({ message: 'Invalid password' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.SECRET_KEY,
      {
        expiresIn: '1h',
      }
    );
    return res.status(201).send(token);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
