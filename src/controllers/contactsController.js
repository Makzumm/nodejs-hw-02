import createHttpError from 'http-errors';
import {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact,
} from '../services/contactsServices.js';

export const getContactsController = async (req, res, next) => {
  const allContacts = await getAllContacts();

  if (!allContacts) {
    throw createHttpError(404, 'Contacts are not found!');
  }

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: allContacts,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { id } = req.params;
  const contactById = await getContactById(id);

  if (!contactById) {
    throw createHttpError(404, 'Contact is not found!');
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${id}!`,
    data: contactById,
  });
};

export const createContactController = async (req, res) => {
  const contact = await createContact(req.body);

  res.status(201).json({
    status: 201,
    message: `Successfully created a contact!`,
    data: contact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { id } = req.params;
  const deletedContact = await deleteContact(id);

  if (!deletedContact) {
    throw createHttpError(404, `Contact with id ${id} not found`);
  }

  res.status(204).json({
    status: 204,
    message: 'Successfully deleted the contact',
  });
};

export const upsertContactController = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await updateContact(contactId, req.body, {
    upsert: true,
  });

  if (!result) {
    throw createHttpError(404, 'Contact not found');
  }

  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: `Successfully upserted a contact!`,
    data: result.contact,
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
