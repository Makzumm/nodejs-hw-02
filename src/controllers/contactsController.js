import { getAllContacts, getContactById } from '../services/contactsServices.js';

export const getContactsController = async (req, res) => {
  const allContacts = await getAllContacts();

  if (!allContacts) {
    return res.status(404).json({
      message: 'Contacts not found',
    });
  }

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: allContacts,
  });
};

export const getContactByIdController = async(req, res) => {
    const {id} = req.params;
    const contactById= await getContactById(id);

    if(!contactById){
        return res.status(404).json({
            message: 'Contact not found',
          });
    }

    res.json({
        status: 200,
        message: `Successfully found contact with id ${id}!`,
        data: contactById,
    });
};
