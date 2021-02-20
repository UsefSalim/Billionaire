const mongoose = require('mongoose');

const { Schema } = mongoose;
//* create a User Scheme
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
    unique: true,
  },
  is_valid: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ['User', 'Admin'],
    default: 'User',
  },
});
const User = mongoose.model('User', UserSchema);

exports.UserSchema = UserSchema;
exports.User = User;
