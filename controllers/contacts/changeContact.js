const { Contact } = require("../../models/contact");
const changeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    const error = new Error(`contact with id=${contactId} not found`);
    error.status = 404;
    throw error;
  }
  res.json({
    message: "Updated",
    code: 200,
    data: { result },
  });
};

module.exports = changeContact;
