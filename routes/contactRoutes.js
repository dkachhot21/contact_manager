const express = require('express');
const router = express.Router();
const {constants} = require('../constants');
const { getContacts, createContact, getContact, updateContact, deleteContact } = require('../controllers/contactController');
const validateToken = require('../middleware/validateTokenHandler');

router.use(validateToken); // Validate the token before any route is accessed

router.route('/')
    .get(getContacts)
    .post(createContact);

router.route('/:id')
    .get(getContact)
    .patch(updateContact)
    .delete(deleteContact);


module.exports = router; 