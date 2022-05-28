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
      return;
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
      message: "Server error",
    });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const result = await operations.addContact(name, email, phone);
    res.status(201).json({
      status: "success",
      code: 201,
      data: { result },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Server error",
    });
  }
});

//  "name": "Belle",
//       "email": "belle@mail.com",
//       "phone": "(654)445-5487"

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await operations.removeContact(contactId);
    if (!contact) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `product with id=${contactId} not found`,
      });
    }
    res.json({
      message: "success",
      code: 204,
      data: { contact },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Server error",
    });
  }
});

// router.put("/:contactId", async (req, res, next) => {
//   res.json({ message: "template message" });
// });

module.exports = router;
