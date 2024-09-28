import { Router } from 'express';
import { getContactsController, getContactByIdController, createContactController, deleteContactController, upsertContactController, patchContactController } from '../controllers/contactsController.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getContactsController));
router.get('/contacts/:id', ctrlWrapper(getContactByIdController));
router.post('/contacts', ctrlWrapper(createContactController));
router.delete('/contacts/:id', ctrlWrapper(deleteContactController));
router.put('/contacts/:id', ctrlWrapper(upsertContactController));
router.patch('/contacts/:id', ctrlWrapper(patchContactController));
export default router;
