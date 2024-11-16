import { ContactsCollection } from '../db/models/contactsScheme.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactsCollection.find();
  const contactsCount = await ContactsCollection.find()
    .merge(contactsQuery)
    .countDocuments();

  const students = await contactsQuery.skip(skip).limit(limit).sort({ [sortBy]: sortOrder }).exec();

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: students,
    ...paginationData,
  };
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
