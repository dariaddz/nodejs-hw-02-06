const { Contact } = require("../../models/contact");
const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const contact = await Contact.findById(contactId);
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
