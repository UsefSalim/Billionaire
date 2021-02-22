/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// -------------require models----------  //
const User = require('../models/user.model');

// -------------require validations----------  //
const {
  registerValidations,
  loginValidations,
} = require('../validations/auth.validation');

// --------------- create Token ------------//
const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id, role) =>
  jwt.sign({ id, role }, process.env.SECRET_TOKEN, {
    expiresIn: maxAge,
  });

/* ! @Route  : GET => api/users/register
     Desc    : register a User
     @Access : Pubic
*/
exports.register = async (req, res) => {
  try {
    // verification if number exist
    await User.findOne({ number: req.body.number }, (err, data) => {
      if (err) {
        return res.status(400).json({
          message: 'ce compte est deja existant veillez vous connecter',
        });
      }
    });
    // error validations
    const { error } = registerValidations(req.body);
    if (error) return res.status(400).json(error.details[0].message);
    /// create User
    const registerUser = new User({
      ...req.body,
    });
    /// Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashdPassword = await bcrypt.hash(req.body.password, salt);
    registerUser.password = hashdPassword;

    // insert User In de DataBase
    const addUser = await registerUser.save();
    if (addUser)
      return res
        .status(201)
        .json({ message: `User ${req.body.name} created succefully` });
  } catch (err) {
    return res.status(400).json(err);
  }
};

/*  @Route  : POST => api/user/login
     Desc    : login User
     @Access : Pubic
*/
exports.login = async (req, res) => {
  try {
    // error validations
    const { error } = loginValidations(req.body);
    if (error)
      return res.status(400).json(`validation ${error.details[0].message}`);
    // verification if number exist
    const ifUserExist = await User.findOne({ number: req.body.number });
    if (!ifUserExist)
      return res.status(400).json({ message: 'mail or password incorrect' });
    // verif password
    const validPassword = await bcrypt.compare(
      req.body.password,
      ifUserExist.password
    );
    if (!validPassword)
      return res.status(400).json({ message: 'mail or password incorrect' });
    ifUserExist.online = true;
    ifUserExist.save();
    // Add JsonWebToken
    const token = createToken(ifUserExist._id, ifUserExist.role);
    /// secure:true  deployement Mode !!!
    res.cookie('log_token', token, { httpOnly: true, maxAge });
    return res.status(200).json({ message: token });
  } catch (error) {
    return res.status(400).json(error);
  }
};

/* ! @Route  : POST => api/User/logout
     Desc    : logout User
     @Access : Pubic
*/

exports.logout = async (req, res) => {
  const currentUser = await User.findOne({ _id: res.userId }).select(
    '-password'
  );
  currentUser.online = false;
  currentUser.save();
  res.cookie('log_token', '', { maxAge: 1 });
  res.redirect('/');
};
