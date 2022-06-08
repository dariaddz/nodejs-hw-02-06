const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactSchema = Schema(
  {
    name: {
      type: String,
      minlength: 2,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: [true, "Set email"],
    },
    phone: {
      type: String,
      minlength: 7,
      required: [true, "Set phone number"],
    },
    favorite: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiContactSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().required(),
  phone: Joi.string().min(7).required(),
  favorite: Joi.bool().required(),
});

const Contact = model("contact", contactSchema);
module.exports = { Contact, joiContactSchema };
