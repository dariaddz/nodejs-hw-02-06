const { Conflict } = require("http-errors");
const { User } = require("../../models/user");
const bcrypt = require("bcryptjs");

const signup = async (req, res) => {
  const { password, email, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`Email ${email} in use`);
  }
  const hashPass = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const result = await User.create({ password: hashPass, email, subscription });
  res.status(201).json({
    status: "success",
    code: 201,
    user: {
      result,
    },
  });
};

module.exports = signup;
