const jwt = require('jsonwebtoken');
const authenticate = require('../../middleware/authenticate');
const express = require('express');
const router = express.Router();

router.get('/user/auth', authenticate, async (req, res) => {
});

module.exports = router;
