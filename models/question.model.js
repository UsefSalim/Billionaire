const mongoose = require('mongoose');

const { Schema } = mongoose;

//* create a Room Scheme

const QuestionSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  niveau: {
    type: String,
    enum: ['1', '2', '3'],
    required: true,
  },
  reponce: {
    type: Boolean,
    enum: [true, false],
    required: true,
  },
});

const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;
