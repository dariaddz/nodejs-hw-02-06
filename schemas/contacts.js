const Joi = require("joi");
const contactSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().required(),
  phone: Joi.string().min(7).required(),
});

module.exports = contactSchema;
