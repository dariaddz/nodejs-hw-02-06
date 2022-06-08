const express = require("express");

const { validation, ctrlWrapper } = require("../middlewares");
const { contacts: ctrl } = require("../controllers");
const { joiContactSchema } = require("../models/contact");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getContactById));

router.post("/", validation(joiContactSchema), ctrlWrapper(ctrl.addContact));

router.put(
  "/:contactId",
  validation(joiContactSchema),
  ctrlWrapper(ctrl.changeContact)
);

router.delete("/:contactId", ctrlWrapper(ctrl.deleteContact));

module.exports = router;
