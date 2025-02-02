const express = require('express');

const { ctrlWrapper, validation, userCurrent } = require('../../middlewares');
const { joiSchema, favoriteJoiSchema } = require('../../models/contact');
const { contacts: ctrl } = require('../../controllers');

const router = express.Router();

router.get('/', userCurrent, ctrlWrapper(ctrl.listContacts));

router.get('/:contactId', userCurrent, ctrlWrapper(ctrl.getContactById));

router.post('/', userCurrent, validation(joiSchema), ctrlWrapper(ctrl.addContact));

router.delete('/:contactId', userCurrent, ctrlWrapper(ctrl.removeContact));

router.put('/:contactId', userCurrent, validation(joiSchema), ctrlWrapper(ctrl.updateContact));

router.patch(
  '/:contactId/favorite',
  userCurrent,
  validation(favoriteJoiSchema),
  ctrlWrapper(ctrl.updateFavorite),
);

module.exports = router;
