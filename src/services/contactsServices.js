import { ContactsCollection } from '../db/models/contactsScheme.js';

export const getAllContacts = async () => {
  const contacts = await ContactsCollection.find({});
  return contacts;
};

export const getContactById = async (id) => {
  const contacts = await ContactsCollection.findById(id);
  return contacts;
};

export const createContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};

export const deleteContact = async (id) => {
  const contact = await ContactsCollection.findOneAndDelete({
    _id: id,
  });
  return contact;
};

export const updateContact = async (id, payload) => {
    return ContactsCollection.findByIdAndUpdate(id, payload, { new: true });
};
