const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

console.log(contactsPath);

const getListContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await getListContacts();
  const contactById = contacts.find((contact) => contact.id === contactId);
  return contactById || null;
};

const removeContact = async (contactId) => {
    const contacts = await getListContacts();
    const index = contacts.findIndex(contact => contact.id === contactId);
    if (index === -1) { return null }

    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await getListContacts();

  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return newContact;
};

const updateByID = async (contactId, data) => {
  const contacts = await getListContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  
    if (index === -1) {
    return null;
  }
  contacts[index] = { contactId, ...data };
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  
    return contacts[index];
};

module.exports = {
  getListContacts,
  getContactById,
  removeContact,
  addContact,
  updateByID,
};
