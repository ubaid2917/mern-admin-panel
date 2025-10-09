const Joi = require('joi');

//  Create Patient Card Validation
const create = Joi.object({
  cardId: Joi.string().uuid().required().messages({
    'string.guid': 'Card ID must be a valid UUID',
    'any.required': 'Card ID is required'
  }),
  patientId: Joi.string().uuid().required().messages({
    'string.guid': 'Patient ID must be a valid UUID',
    'any.required': 'Patient ID is required'
  }),
  discount: Joi.number().min(0).max(100).required().messages({
    'number.min': 'Discount cannot be negative',
    'number.max': 'Discount cannot exceed 100%',
    'any.required': 'Discount is required'
  }),
  expiredAt: Joi.date().greater('now').optional().messages({
    'date.greater': 'Expiry date must be in the future'
  }),
  isExpired: Joi.boolean().optional()
});

// Update Patient Card Validation
const update = Joi.object({
  cardId: Joi.string().uuid().optional(),
  patientId: Joi.string().uuid().optional(),
  discount: Joi.number().min(0).max(100).optional(),
  expiredAt: Joi.date().greater('now').optional(),
  isExpired: Joi.boolean().optional()
});

module.exports = {
  create,
  update
};