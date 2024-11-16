import { Router } from 'express';
import {
  getContactsController,
  getContactByIdController,
  createContactController,
  deleteContactController,
  upsertContactController,
  patchContactController,
} from '../controllers/contactsController.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getContactsController));
router.get('/contacts/:id', isValidId, ctrlWrapper(getContactByIdController));
router.post(
  '/contacts',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);
router.delete('/contacts/:id', isValidId, ctrlWrapper(deleteContactController));
router.put('/contacts/:id', isValidId, ctrlWrapper(upsertContactController));
router.patch(
  '/contacts/:id',
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);
export default router;
