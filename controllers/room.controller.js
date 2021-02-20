const { User } = require('../models/user.model');
/* ! @Route  : POST => api/room/
     Desc    : profile User
     @Access : Private
*/
exports.profile = async (req, res) => {
  // const idUser =
  try {
    const currentUser = await User.findOne({ _id: res.userId }).select(
      'name email number'
    );
    currentUser && res.status(200).json(currentUser);
  } catch (error) {
    res.status(200).json(error);
  }
};

exports.createRoom = (req, res) => {};
