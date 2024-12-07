import { ContactsCollection } from '../db/models/contactsScheme.js';

export const getAllContacts = async ({ page = 1, perPage = 10, sortBy, sortOrder, userId }) => {
  const limit = parseInt(perPage);
  const skip = (page - 1) * perPage;

  const contacts = await ContactsCollection.find({ userId })
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder });

  const contactsCount = await ContactsCollection.countDocuments({ userId });

  return {
    data: contacts,
    total: contactsCount,
  };
};

export const getContactById = async (id, userId) => {
  return ContactsCollection.findOne({ _id: id, userId });
};

export const createContact = async (payload) => {
  return ContactsCollection.create(payload);
};

export const deleteContact = async (id, userId) => {
  return ContactsCollection.findOneAndDelete({ _id: id, userId });
};

export const updateContact = async (id, payload, userId) => {
  return ContactsCollection.findOneAndUpdate({ _id: id, userId }, payload, { new: true });
};
