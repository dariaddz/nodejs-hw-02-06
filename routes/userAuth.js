const express = require("express");
const { validation, ctrlWrapper, auth } = require("../middlewares");
const { userAuth: ctrl } = require("../controllers");
const { joiUserSchema } = require("../models/user");

const router = express.Router();

router.post("/signup", validation(joiUserSchema), ctrlWrapper(ctrl.signup));
router.post("/login", validation(joiUserSchema), ctrlWrapper(ctrl.login));
router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));
module.exports = router;
