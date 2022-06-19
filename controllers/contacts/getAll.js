const { Contact } = require("../../models/contact");

const getAll = async (req, res) => {
  const { _id } = req.user;
  const result = await Contact.find({ owner: _id }).populate(
    "owner",
    "email _id"
  );
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getAll;
