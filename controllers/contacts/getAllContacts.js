// const operations = require("../../models/contacts");

// const getAllContacts = async (req, res, next) => {
//   try {
//     const contacts = await operations.listContacts();
//     res.json({
//       status: "success",
//       code: 200,
//       data: { contacts },
//     });
//   } catch (error) {
//     next(error);
//   }
// };
// module.exports = getAllContacts;

const { Product } = require("../../schemas/");
const getAll = async (req, res) => {
  const results = await Product.find({});
  res.json({
    status: "success",
    code: 200,
    data: { results },
  });
};

module.exports = getAll;
