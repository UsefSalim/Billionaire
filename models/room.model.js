const mongoose = require('mongoose');
const { UserSchema } = require('./user.model');

const { Schema } = mongoose;

//* create a Room Scheme

const RoomSchema = new Schema({
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  status: {
    type: Boolean,
    default: true,
  },
  place: {
    type: Number,
  },
});

const Room = mongoose.model('Room', RoomSchema);

module.exports = Room;
