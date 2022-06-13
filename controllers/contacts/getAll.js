const { Contact } = require("../../models/contact");
// console.log(Contact);

const getAll = async (req, res) => {
  const result = await Contact.find({});
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getAll;
