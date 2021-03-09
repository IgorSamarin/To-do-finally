const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).send();
    }
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    req.decodedToken = decodedToken;
    next();
  } catch (err) {
    res.status(401).send();
  }
};
