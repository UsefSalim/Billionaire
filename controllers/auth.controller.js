const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
// -------------require models----------  //
const User = require('../models/user.model');

// -------------require validations----------  //
// const {
//   registerValidations,
//   loginValidations,
// } = require('../validations/auth.validation');

// --------------- create Token ------------//
const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) =>
  jwt.sign({ id }, process.env.SECRET_TOKEN, {
    expiresIn: maxAge,
  });

/* ! @Route  : GET => api/users/register
     Desc    : register a User
     @Access : Pubic
*/
exports.register = async (req, res) => {
  // verification if mail exist
  const ifExist = await User.User.findOne({ number: req.body.number });
  ifExist &&
    res.status(400).json({ message: 'ce compte est deja existant veillez vous connecter' });
  // error validations
  // const { error } = registerValidations(req.body);
  // error && res.status(400).json(error.details[0].message);
  /// create User
  const registerUser = new User.User({
    ...req.body,
  });
  /// Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashdPassword = await bcrypt.hash(req.body.password, salt);
  registerUser.password = hashdPassword;
  try {
    // insert User In de DataBase
    const addUser = await registerUser.save();
    addUser &&
      res
        .status(201)
        .json({ message: `User ${req.body.name} created succefully` });
  } catch (err) {
    res.status(400).json(err);
  }
};

/*  @Route  : POST => api/user/login
     Desc    : login User
     @Access : Pubic
*/
exports.login = async (req, res) => {
  // error validations
  // const { error } = loginValidations(req.body);
  // error && res.status(400).json(error.details[0].message);
  // verification if mail exist
  const ifUserExist = await User.User.findOne({ email: req.body.email });
  // verif password
  const validPassword = await bcrypt.compare(
    req.body.password,
    ifUserExist.password
  );
  (!ifUserExist || !validPassword) &&
    res.status(400).json({ message: 'mail ou password incorrect ' });
  // Add JsonWebToken
  // console.log(ifUserExist._id);
  const token = createToken(ifUserExist._id);
  /// secure:true  deployement Mode !!!
  res.cookie('log_token', token, { httpOnly: true, maxAge });
  res.status(200).json({ message: token });
};

/* ! @Route  : POST => api/User/logout
     Desc    : logout User
     @Access : Pubic
*/

exports.logout = (req, res) => {
  res.cookie('log_token', '', { maxAge: 1 });
  res.redirect('/');
};
