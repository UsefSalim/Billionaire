const mongoose = require('mongoose');

const { Schema } = mongoose;

//* create a Room Scheme

const RoomSchema = new Schema({
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
      // default: null,
    },
  ],
  status: {
    type: Boolean,
    default: true,
  },
  place: {
    type: Number,
    required: true,
  },
});

const Room = mongoose.model('Room', RoomSchema);

module.exports = Room;
