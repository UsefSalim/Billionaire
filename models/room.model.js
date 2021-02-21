const { boolean } = require('joi');
const mongoose = require('mongoose');
const User = require('./user.model');

const { Schema } = mongoose;

//* create a Room Scheme

const RoomSchema = new Schema({
  users: [User.UserSchema],
  status: {
    type: boolean,
    default: true,
  },
});

const Room = mongoose.model('Room', RoomSchema);
module.exports = Room;
