const express = require("express");

const { auth, validation, ctrlWrapper } = require("../middlewares");
const { contacts: ctrl } = require("../controllers");

const { joiContactSchema, joiFavoriteSchema } = require("../models/contact");

const router = express.Router();

router.get("/", auth, ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getContactById));

router.post(
  "/",
  auth,
  validation(joiContactSchema),
  ctrlWrapper(ctrl.addContact)
);

router.put(
  "/:contactId",
  validation(joiContactSchema),
  ctrlWrapper(ctrl.changeContact)
);

router.patch(
  "/:contactId/favorite",
  validation(joiFavoriteSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

router.delete("/:contactId", ctrlWrapper(ctrl.deleteContact));

module.exports = router;
