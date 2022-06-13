// const { Schema, model } = require("mongoose");
// const Joi = require("joi");

// const userSchema = Schema(
//   {
//     password: {
//       type: String,
//       minlength: 5,
//       required: [true, "Password is required"],
//     },
//     email: {
//       type: String,
//       required: [true, "Email is required"],
//       unique: true,
//     },
//     subscription: {
//       type: String,
//       enum: ["starter", "pro", "business"],
//       default: "starter",
//     },
//     token: {
//       type: String,
//       default: null,
//     },
//   },
//   { versionKey: false, timestamps: true }
// );

// const joiUserSchema = Joi.object({
//   password: Joi.string().min(5).required(),
//   email: Joi.string().required(),
//   subscription: Joi.string().required(),
//   token: Joi.string(),
// });

// const User = model("user", userSchema);
// module.exports = { User, joiUserSchema };
