const Joi = require('joi');

// register Validations

exports.registerValidations = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().min(5).max(50).trim(),
    email: Joi.string().email().required().trim(),
    password: Joi.string().required().min(6).max(1024),
    number: Joi.number().min(10).required(),
  });

  return schema.validate(data);
};
// loginValidations

exports.loginValidations = (data) => {
  const schema = Joi.object({
    number: Joi.number().min(10).required(),
    password: Joi.string().required().min(6),
  });

  return schema.validate(data);
};
