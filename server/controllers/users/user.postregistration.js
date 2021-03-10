const User = require('../../models').User;
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/user/registration', async (req, res) => {
  try {
    if (!req.body.username || !req.body.password) {
      return res.status(400).send({ message: 'Invalid request' });
    }
    if (req.body.password.length < 5 || req.body.username.length < 5) {
      return res.status(400).send({ message: 'Too small password or name' });
    }
    const existingUser = await User.findOne({
      where: { username: req.body.username },
    });
    if (existingUser) {
      return res.status(400).send({ message: 'Choose another name ' });
    }
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
    });
    
    const token = jwt.sign(
      { id: newUser.id, username: newUser.username },
      process.env.SECRET_KEY,
      {
        expiresIn: 60*15,
      }
    );
    return res.status(201).send(token);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
