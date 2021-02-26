/// * -------------------------------------------------------------------------- question Controllers
// ------------- require mongoose ObjectId ----//
const ObjectID = require('mongoose').Types.ObjectId;

// -------------require models----------  //
const Question = require('../models/question.model');

/* ! @Route  : GET => api/admin/questions
     Desc    : Get all questions 
     @Access : Pubic
*/
exports.getAll = async (req, res) => {
  try {
    const all = await Question.find().sort({ date: -1 });
    if (all) return res.status(200).json(all);
  } catch (err) {
    return res.status(400).json(err);
  }
};

/* ! @Route  : GET => api/admin/question/:id
     Desc    : Get One  question
     @Access : Pubic
*/
exports.getOne = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res
      .status(404)
      .json({ message: `l'ID ${req.params.id} n'est pas reconnu` });
  Question.findById(req.params.id, (err, info) => {
    if (!err) return res.status(200).json(info);
    return res.status(400).json({ err });
  });
};

/* ! @Route  : POST => api/admin/question
     Desc    : Create question
     @Access : Pubic
*/
exports.addquestion = async (req, res) => {
  const newQuestion = new Question({ ...req.body });
  try {
    const addquestion = await newQuestion.save();
    if (addquestion) return res.status(201).json(newQuestion);
  } catch (err) {
    return res.status(400).json(err);
  }
};
/* ! @Route  : DELETE => api/admin/question/id
     Desc    : Delete One question
     @Access : Pubic
*/
exports.deletquestion = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res
      .status(400)
      .json({ message: `l'ID ${req.params.id} n'est pas reconnu` });
  try {
    await Question.remove({ _id: req.params.id }).exec();
    return res.status(200).json({
      message: `l'question avec l'id ${req.params.id} est supprimer avec succées`,
    });
  } catch (err) {
    return res.status(500).json({ err });
  }
};

/* ! @Route  : DELETE => api/admin/questions
     Desc    : Delete All questions
     @Access : Pubic
*/

exports.deletAllquestions = async (req, res) => {
  try {
    const deletMany = await Question.deleteMany();
    if (deletMany)
      return res.status(200).json({
        message: '0 element veiller rajouter un element a la todo liste',
      });
  } catch (err) {
    return res.status(500).json({ err });
  }
};
/* ! @Route  : PUT => api/admin/question/:id
     Desc    : UPDATE  question
     @Access : Pubic
*/

exports.updatequestion = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res
      .status(404)
      .json({ message: `l'ID ${req.params.id} n'est pas reconnu` });
  try {
    await Question.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { new: true, useFindAndModify: true, upsert: true },
      (err, info) => {
        if (!err) return res.status(200).json(info);
        return res.status(400).json({ err });
      }
    );
  } catch (err) {
    return res.status(400).json({ err });
  }
};
