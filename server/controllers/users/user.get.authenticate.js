const jwt = require('jsonwebtoken');
const authenticate = require('../../middleware/auhenticate');
const express = require('express');
const router = express.Router();

router.get('/user/auth', authenticate, async (req, res) => {
  console.log(req);
});

module.exports = router;
