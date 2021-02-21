const mongoose = require('mongoose');
const { UserSchema } = require('./user.model');

const { Schema } = mongoose;

//* create a Room Scheme

const RoomSchema = new Schema({
  users: [UserSchema],
  status: {
    type: Boolean,
    default: true,
  },
});

const Room = mongoose.model('Room', RoomSchema);

module.exports = Room;
