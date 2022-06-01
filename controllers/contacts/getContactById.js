const operations = require("../../models/contacts.js");

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const contact = await operations.getContactById(contactId);
    if (!contact) {
      const error = new Error(`contact with id=${contactId} not found`);
      error.status = 404;
      throw error;
    }
    res.json({
      message: "success",
      code: 200,
      data: { contact },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getContactById;
