const { Contact } = require("../../models/contact");

const getAllContacts = async ({ _id, page, limit, favorite }) => {
  const skip = (page - 1) * limit;
  if (!favorite) {
    return await Contact.find({ owner: _id }, "", {
      skip,
      limit: Number(limit),
    }).populate("owner", "email _id");
  }
  return await Contact.find({ owner: _id, favorite }, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "email _id");
};

const getAll = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit, favorite } = req.query;
  const result = await getAllContacts({ _id, page, limit, favorite });

  res.json({ message: "Success", code: 200, data: { result } });
};

module.exports = getAll;
