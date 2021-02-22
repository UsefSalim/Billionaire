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
/* ! @Route  : POST => api/admin/createadmin
     Desc    : create admin account
     @Access : Private / Admin
*/
exports.createAdmin = (req, res) => {};
