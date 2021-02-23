const nodemailer = require('nodemailer');
const User = require('../models/user.model');
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
exports.createAdmin = (req, res) => {};
