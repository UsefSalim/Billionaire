const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const { registerValidations } = require('../validations/auth.validation');
const { register } = require('./auth.controller');
/* ! @Route  : POST => api/admin/
     Desc    : admin profile
     @Access : Private / Admin
*/
exports.profile = async (req, res) => {
  try {
    const UserInvalide = await User.find({ is_valid: false }).select(
      'name number email'
    );
    return res.status(200).json(UserInvalide);
  } catch (error) {
    return res.status(400).json(error);
  }
};
/* ! @Route  : POST => api/admin/valideuser/:id
     Desc    : valid user account
     @Access : Private / Admin
*/
exports.validUser = async (req, res) => {
  try {
    const user = await User.find({ _id: req.params.id });
    console.log('--------------------');
    console.log(user.email);
    console.log('--------------------');
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'mailportfolio33@gmail.com',
        pass: '12365897M+',
      },
    });
    const mailOptions = {
      from: 'mailportfolio33@gmail.com',
      to: user.email,
      subject: 'confirmation de compte',
      text: 'votre compte est vien confirmé ',
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) return res.status(400).json({ message: 'mail non envoyé' });
      return res.status(200).json({ message: info.response });
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

/* ! @Route  : POST => api/admin/createadmin
     Desc    : create admin account
     @Access : Private / Admin
*/
exports.createAdmin = async (req, res) => {
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
    const registerAdmin = new User({
      ...req.body,
    });
    /// Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashdPassword = await bcrypt.hash(req.body.password, salt);
    registerAdmin.password = hashdPassword;
    registerAdmin.is_valid = true;
    registerAdmin.role = 'Admin';

    // insert User In de DataBase
    const addAdmin = await registerAdmin.save();
    if (addAdmin)
      return res
        .status(201)
        .json({ message: `Admin ${req.body.name} created succefully` });
  } catch (err) {
    return res.status(400).json({ catchmessage: err });
  }
};
