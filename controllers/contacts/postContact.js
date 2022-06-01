const operations = require("../../models/contacts.js");
const contactSchema = require("../../schemas");

const postContact = async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const result = await operations.addContact(req.body);
    res.status(201).json({
      status: "Posted",
      code: 201,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = postContact;
