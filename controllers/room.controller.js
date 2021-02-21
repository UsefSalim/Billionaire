const { User } = require('../models/user.model');
const Room = require('../models/room.model');
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
    if (currentUser) return res.status(200).json(currentUser);
  } catch (error) {
    res.status(200).json(error);
  }
};

exports.createRoom = async (req, res) => {
  try {
    const currentUser = await User.findOne({ _id: res.userId });
    const createRoom = await Room({ users: currentUser });
    const saveRoom = createRoom.save();
    if (saveRoom) return res.status(200).json(createRoom);
  } catch (error) {
    res.status(200).json(error);
  }
};
