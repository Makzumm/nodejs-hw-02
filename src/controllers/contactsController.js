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

  if(!allContacts){
    throw createHttpError(404,'Contacts are not found!');
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

  if(!contactById){
    throw createHttpError(404,'Contact is not found!');
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
    message: `Successfully created a student!`,
    data: contact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await deleteContact(contactId);

  if(!contact){
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(204).send();
};


export const upsertContactController = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await updateContact(contactId, req.body, {
    upsert: true,
  });

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: `Successfully upserted a contact!`,
    data: result.contact,
  });
};

export const patchContactController = async (req, res, next) => {
  const {contactId} = req.params;

  const result = await updateContact(contactId, req.body);

  if (!result) {
    next(createHttpError(404, 'Student not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully patched a student!`,
    data: result.contact,
  });
};
