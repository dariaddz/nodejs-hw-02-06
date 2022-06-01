const operations = require("../../models/contacts");
const contactSchema = require("../../schemas");

const changeContact = async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const { contactId } = req.params;
    const result = await operations.updateContact(contactId, req.body);
    res.json({
      message: "Updated",
      code: 200,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = changeContact;
