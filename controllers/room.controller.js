const mongoose = require('mongoose');
const Fawn = require('fawn');

Fawn.init(mongoose);

const User = require('../models/user.model');
const Room = require('../models/room.model');

/* ! @Route  : GET => /api/admin/room
     Desc    : profile User
     @Access : Private
*/
exports.profile = async (req, res) => {
  // const idUser =
  try {
    const currentUser = await User.findOne({ _id: res.userId }).select(
      '-password'
    );
    if (currentUser.role === 'User') {
      if (currentUser.is_valid === false)
        return res.status(200).json({
          message:
            "votre compte n'est pas valider vous allé recevoir un mail de validation",
        });
      if (currentUser.disponible === false)
        return res.status(200).json({
          message: "vous faite deja partie d'une room",
        });
      const allRoom = await Room.find();
      const roomDispo = allRoom
        .filter((room) => room.users.length <= 3)
        .populate('users');
      return res.status(200).json({ currentUser, roomDispo });
    }
    if (currentUser.role === 'Admin') {
      const invalidUser = await User.find({ is_valid: false }).select(
        '-password'
      );
      return res.status(200).json({ invalidUser });
    }
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
    if (currentUser.role === 'Admin')
      return res
        .status(400)
        .json({ message: "l'admin ne peux pas crée de room" });
    if (currentUser.disponible === false)
      return res
        .status(400)
        .json({ message: "vous faite deja partie d'une room" });
    console.log(`number user ${currentUser.number}`);
    const createRoom = new Room({ users: currentUser._id, place: 3 });
    const newFawn = new Fawn.Task()
      .update(
        'users',
        { _id: currentUser._id },
        {
          $set: {
            disponible: false,
            room: createRoom._id,
          },
        }
      )
      .save('rooms', createRoom)
      .run({ useMongoose: true });
    return res.status(200).json(newFawn);
  } catch (error) {
    res.status(400).json({ message: 'mablanch' });
  }
};

/* ! @Route  : GET => /api/admin/room/createroom
     Desc    : rejoindre room
     @Access : Private
*/
exports.rejoindreRoom = async (req, res) => {
  try {
    const currentUser = await User.findOne({ _id: res.userId });
    if (currentUser.role === 'Admin')
      return res
        .status(400)
        .json({ message: "l'admin ne peux pas crée de room" });
    const currentRoom = await Room.findOne({ _id: req.params.id });
    if (!currentRoom)
      return res.status(400).json({ message: 'room non disponnible' });
    if (currentRoom.place == 0) {
      return res
        .status(400)
        .json({ message: 'le nombre de place de cette room et atteint' });
    }
    if (currentRoom.users[currentRoom.users.length - 1] == res.userId) {
      return res
        .status(400)
        .json({ message: 'vous faite deja partie de cette room' });
    }
    currentRoom.users.map((id) => {
      if (id == res.userId) {
        return res
          .status(400)
          .json({ message: 'vous faite deja partie de cette room ' });
      }
    });
    console.log('avant task');
    const createdQuery = new Fawn.Task()
      .update(
        'rooms',
        { _id: req.params.id },
        {
          $set: {
            users: [...currentRoom.users, currentUser._id],
            place: currentRoom.place - 1,
          },
        }
      )
      .update(
        'users',
        { _id: res.userId },
        {
          $set: {
            disponible: false,
            room: currentRoom._id,
          },
        }
      )
      .run({ useMongoose: true });
    if (createdQuery) return res.status(201).json({ createdQuery });
  } catch (error) {
    return res.status(400).json({ error1: error });
  }
};
