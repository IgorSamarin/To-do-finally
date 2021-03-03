const User = require('../../models').User;
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

router.post('/user/authentification', async (req, res) => {
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
      return res.status(400).send('Invalid password');
    }
    return res.status(200).send(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
