const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().required(),
  fatherName: Joi.string().required(),
  phone: Joi.string().required(),
  gender: Joi.string().required(),
  dob: Joi.date().allow('').optional(),
  bloodGroup: Joi.string().required(),
  martialStatus: Joi.string().required(),
  address: Joi.string().optional().allow(''),
});

module.exports = schema;
