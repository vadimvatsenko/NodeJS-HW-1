const path = require('path');
const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');

const contactsPath = './db/contacts.json';

async function listContacts() {
  try {
    const contacts = await fs.readFile(path.resolve(contactsPath));
    return JSON.parse(contacts.toString())
  } catch (error) {
     console.log(error)
  }
  
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const findContactByID = contacts
      .find(contact => contact.id.toString().toLowerCase() === contactId.toString().toLowerCase());
    if (!findContactByID) {
      return null
    }
    return findContactByID;

  } catch (error) {
    
  }
}

async function removeContact(contactId) {
  console.log(contactId)
  try {
    const contacts = await listContacts();
    const delContact = contacts.filter(contact => contact.id === contactId);
    const currentContacts = contacts.filter(contact => contact.id !== contactId )
    await fs.writeFile(path.resolve(contactsPath), JSON.stringify(currentContacts));
    return delContact;

  } catch (error) {
    console.log(error)
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: uuidv4(),
      name,
      email,
      phone
    }
    contacts.push(newContact);
    await fs.writeFile(path.resolve(contactsPath), JSON.stringify(contacts));
    return newContact;
    
  } catch (error) {
    console.log(error)
  }

}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};

