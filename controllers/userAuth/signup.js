const { Conflict } = require("http-errors");
const { User } = require("../../models/user");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");
const { sendEmail } = require("../../helpers/sendEmail");

const signup = async (req, res) => {
  const { password, email, subscription } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new Conflict(`Email ${email} in use`);
  }

  const avatarURL = gravatar.url(email);

  const hashPass = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const verificationToken = uuidv4();

  const result = await User.create({
    password: hashPass,
    email,
    subscription,
    avatarURL,
    verificationToken,
  });

  const mail = {
    to: email,
    subject: "Email confirmation",
    html: `<a target="_blank" href=""http://localhost:3000/api/users/verify/${verificationToken}>Confirm my email</a>`,
  };

  await sendEmail(mail);

  res.status(201).json({
    status: "success",
    code: 201,
    user: {
      result,
    },
  });
};

module.exports = signup;
