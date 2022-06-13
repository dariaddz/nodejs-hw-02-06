const express = require("express");
const { validation, ctrlWrapper } = require("../middlewares");
const { userAuth: ctrl } = require("../controllers");
const { joiUserSchema } = require("../models/user");

console.log(ctrl.signup);
const router = express.Router();

router.post("/signup", validation(joiUserSchema), ctrlWrapper(ctrl.signup));

module.exports = router;
