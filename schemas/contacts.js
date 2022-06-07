// const Joi = require("joi");
// const contactSchema = Joi.object({
//   name: Joi.string().min(2).required(),
//   email: Joi.string().required(),
//   phone: Joi.string().min(7).required(),
// });

const { Schema, model } = require("mongoose");

const contactSchema = Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const Contact = model("contact", contactSchema);
module.exports = Contact;
