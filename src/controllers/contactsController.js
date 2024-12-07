import createHttpError from 'http-errors';
import {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact,
} from '../services/contactsServices.js';

export const getContactsController = async (req, res, next) => {
  console.log('req.user inside getContactsController:', req.user);

  const { page, perPage } = req.query;
  const { sortBy, sortOrder } = req.query;

  if (!req.user || !req.user._id) {
    return next(createHttpError(401, 'User authentication failed or missing'));
  }

  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    userId: req.user._id,
  });

  res.status(200).json({
    status: 200,
    message: 'Contacts fetched successfully!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { id } = req.params;
  const contact = await getContactById(id, req.user._id);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Contact found!',
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  const payload = {
    ...req.body,
    userId: req.user._id,
  };
  const contact = await createContact(payload);

  res.status(201).json({
    status: 201,
    message: 'Contact created successfully!',
    data: contact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { id } = req.params;
  const contact = await deleteContact(id, req.user._id);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(204).send();
};

export const upsertContactController = async (req, res, next) => {
  const { id } = req.params;
  const contact = await updateContact(id, req.body, req.user._id);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Contact updated successfully!',
    data: contact,
  });
};

export const patchContactController = async (req, res, next) => {
  const { id } = req.params;
  const updatedContact = await updateContact(id, req.body);

  if (!updatedContact) {
    throw createHttpError(404, `Contact with id ${id} not found`);
  }

  res.json({
    status: 200,
    message: 'Successfully updated the contact',
    data: updatedContact,
  });
};

