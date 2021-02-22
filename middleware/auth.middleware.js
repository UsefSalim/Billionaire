const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

exports.auth = async (req, res, next) => {
  const token = req.cookies.log_token;
  if (token) {
    jwt.verify(token, process.env.SECRET_TOKEN, async (err, decodedToken) => {
      if (!err) {
        const user = User.findById(decodedToken.id);
        res.locals.user = user;
        res.userId = decodedToken.id;
        next();
      } else {
        res.locals.user = null;
        res.cookie('log_token', '', { maxAge: 1 });
        res.status(400).json('private root need login');
      }
    });
  } else {
    res.locals.user = null;
    res.status(400).json('private root need login');
  }
};
