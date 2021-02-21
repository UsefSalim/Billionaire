const mongoose = require('mongoose');

const { Schema } = mongoose;
//* create a User Scheme
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
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
    minlenght: 6,
    maxlenght: 1024,
  },
  number: {
    type: Number,
    required: true,
    unique: true,
    min: 6,
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
