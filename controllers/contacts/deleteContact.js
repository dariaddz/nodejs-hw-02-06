const Contact = require("../../models");

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndRemove(contactId);
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
};

module.exports = deleteContact;
