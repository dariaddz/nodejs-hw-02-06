const fs = require("fs/promises");
const path = require("path");
const uuid = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const list = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(list);
  } catch (error) {
    return error.message;
  }
};

const getContactById = async (contactId) => {
  try {
    const list = await listContacts();
    const contact = list.find((item) => item.id === contactId);
    return contact;
  } catch (err) {
    console.log(err);
  }
};

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

const addContact = async ({ name, email, phone }) => {
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

const updateContact = async (contactId, name, email, phone) => {
  try {
    const contacts = await listContacts();
    let updatedContact;
    contacts.forEach((contact) => {
      if (contact.id === contactId) {
        contact.phone = phone;
        contact.email = email;
        contact.name = name;
        updatedContact = contact;
      }
    });
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return updatedContact;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
