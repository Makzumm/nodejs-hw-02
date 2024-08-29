import { ContactsCollection } from '../db/models/contactsScheme.js';

export const getAllContacts = async () => {
    const contacts = await ContactsCollection.find({});

    return contacts;
};

export const getContactById = async (id) => {
    const contacts = await ContactsCollection.findById(id);
    
    return contacts;
};
