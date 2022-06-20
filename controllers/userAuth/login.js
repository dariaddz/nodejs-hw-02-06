const dotenv = require("dotenv");
const { Unauthorized } = require("http-errors");
const { User } = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

dotenv.config();

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new Unauthorized(`User with email ${email} not found`);
  }

  const comparePass = bcrypt.compareSync(password, user.password);
  if (!comparePass) {
    throw new Unauthorized("Wrong password!");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    status: "success",
    code: 200,
    data: { token },
  });
};

module.exports = login;
