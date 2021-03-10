const jwt = require('jsonwebtoken');
const util = require('util');

module.exports = async function (req, res, next) {
  const verifyPromise = util.promisify(jwt.verify);
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) req.decoded = null
    const decoded = await verifyPromise(token, process.env.SECRET_KEY);
    req.decoded = decoded;
  } catch (error) {
    console.log(error.message);
    req.decoded = null
  }
  next();
};