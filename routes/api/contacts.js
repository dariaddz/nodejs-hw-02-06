const express = require("express");
const router = express.Router();
const operations = require("../../models/contacts.js");
const contactSchema = require("../../schemas");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await operations.listContacts();
    res.json({
      status: "success",
      code: 200,
      data: { contacts },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const contact = await operations.getContactById(contactId);
    if (!contact) {
      const error = new Error(`contact with id=${contactId} not found`);
      error.status = 404;
      throw error;
    }
    res.json({
      message: "success",
      code: 200,
      data: { contact },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const result = await operations.addContact(req.body);
    res.status(201).json({
      status: "Posted",
      code: 201,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await operations.removeContact(contactId);
    if (!contact) {
      const error = new Error(`contact with id=${contactId} not found`);
      error.status = 404;
      throw error;
    }
    res.json({
      message: "deleted",
      code: 200,
      data: { contact },
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const { contactId } = req.params;
    const result = await operations.updateContact(contactId, req.body);
    res.json({
      message: "Updated",
      code: 200,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
