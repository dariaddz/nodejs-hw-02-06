const fs = require("fs/promises");
const path = require("path");
const uuid = require("uuid");

const contactsPath = path.resolve(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const list = await fs.readFile(contactsPath, "utf8");

    return JSON.parse(list);
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const list = await listContacts();
    const contact = list.find((item) => item.id === contactId);
    return contact;
  } catch (error) {
    console.log(error);
  }
};

// node models/contacts.js

const removeContact = async (contactId) => {
  try {
    const list = await listContacts();
    const contactToDelete = await getContactById(contactId);
    const newList = list.filter((contact) => contact.id !== `${contactId}`);

    await fs.writeFile(contactsPath, JSON.stringify(newList));
    return contactToDelete;
  } catch (err) {
    console.log(err);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const newContact = {
      id: uuid.v4(),
      name: name,
      email: email,
      phone: phone,
    };

    const list = await listContacts();
    list.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(list));
    return newContact;
  } catch (err) {
    console.log(err);
  }
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
