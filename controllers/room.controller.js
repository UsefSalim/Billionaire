const { User } = require('../models/user.model');
const Room = require('../models/room.model');

/* ! @Route  : GET => /api/admin/room
     Desc    : profile User
     @Access : Private
*/
exports.profile = async (req, res) => {
  // const idUser =
  try {
    const currentUser = await User.findOne({ _id: res.userId }).select(
      'name email number'
    );
    const allRoom = await Room.find();
    const roomDispo = allRoom.filter((room) => room.users.length <= 3);

    if (currentUser) return res.status(200).json({ currentUser, roomDispo });
  } catch (error) {
    res.status(200).json(error);
  }
};

/* ! @Route  : GET => /api/admin/room/createroom
     Desc    : create a room 
     @Access : Private
*/
exports.createRoom = async (req, res) => {
  try {
    const currentUser = await User.findOne({ _id: res.userId });
    const createRoom = await Room({ users: currentUser._id, place: 3 });
    const saveRoom = createRoom.save();
    if (saveRoom) return res.status(200).json(createRoom);
  } catch (error) {
    res.status(200).json(error);
  }
};

/* ! @Route  : GET => /api/admin/room/createroom
     Desc    : rejoindre room
     @Access : Private
*/
exports.rejoindreRoom = async (req, res) => {
  try {
    const currentRoom = await Room.findOne({ _id: req.params.id });
    currentRoom.users = [...currentRoom.users, res.userId];
    currentRoom.place -= 1;
    currentRoom.save();
    return res.status(201).json(currentRoom);
  } catch (error) {
    return res.status(400).json(error);
  }
};
