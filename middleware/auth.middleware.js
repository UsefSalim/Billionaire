const jwt = require('jsonwebtoken');
const userModel = require('../models/User.model');

exports.auth = async (req, res, next) => {
  const token = req.cookies.log_token;
  token &&
    jwt.verify(token, process.env.SECRET_TOKEN, async (err, decodedToken) => {
      if (!err) {
        const user = userModel.findById(decodedToken.id);
        res.locals.user = user;
        next();
      } else {
        res.locals.user = null;
        res.cookie('log_token', '', { maxAge: 1 });
        next();
      }
    });
  res.locals.user = null;
  next();
};