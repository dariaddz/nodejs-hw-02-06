const operations = require("../../models/contacts.js");

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await operations.removeContact(contactId);
    if (!contact) {
      const error = new Error(`contact with id=${contactId} not found`);
      error.status = 404;
      throw error;
    }
    res.json({
      message: "deleted",
      code: 200,
      data: { contact },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteContact;
