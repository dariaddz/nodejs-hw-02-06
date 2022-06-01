const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers");

router.get("/", ctrl.getAllContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", ctrl.postContact);

router.delete("/:contactId", ctrl.deleteContact);

router.put("/:contactId", ctrl.changeContact);

module.exports = router;
