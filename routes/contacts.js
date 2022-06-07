const express = require("express");

const { ctrlWrapper } = require("../middlewares");
const contacts = require("../controllers");
console.log("contacts", contacts);

const router = express.Router();

router.get("/", ctrlWrapper(contacts.getAll));

module.exports = router;
