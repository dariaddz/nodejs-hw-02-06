const { User } = require("../../models/user");
const { sendEmail } = require("../../helpers/sendEmail");

const reuseVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user.verify) {
    return res.status(400).json({
      message: "Verification has already been passed",
    });
  }

  const mail = {
    to: email,
    subject: "Email confirmation",
    html: `<a target="_blank" href=""http://localhost:3000/api/users/verify/${user.verificationToken}>Confirm my email</a>`,
  };

  await sendEmail(mail);

  res.status(200).json({
    message: "Verification email sent",
    code: 200,
  });
};
module.exports = reuseVerifyEmail;
