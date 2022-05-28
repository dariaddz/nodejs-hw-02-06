const express = require("express");

const router = express.Router();
const operations = require("../../models/contacts.js");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await operations.listContacts();
    res.json({
      status: "success",
      code: 200,
      data: { contacts },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Server error",
    });
  }
});

// node routes/api/contacts.js

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const contact = await operations.getContactById(contactId);
    if (!contact) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `product with id=${contactId} not found`,
      });
    }
    res.json({
      message: "success",
      code: 200,
      data: { contact },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "contact id",
    });
  }
});

router.post("/", async (req, res, next) => {
  res.json({ message: "template message" });
});

// router.delete("/:contactId", async (req, res, next) => {
//   res.json({ message: "template message" });
// });

// router.put("/:contactId", async (req, res, next) => {
//   res.json({ message: "template message" });
// });

module.exports = router;
