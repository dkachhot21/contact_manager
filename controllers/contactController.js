const { constants } = require('../constants');
const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');




//@desc Get all contacts
//@route GET /contact/
//@access private
const getContacts = asyncHandler(async (req, res) => {
    const user_id = req.user.id;
    const contacts = await Contact.find({ user_id });
    res.status(200).json(contacts);
});





//@desc create new contact
//@route POST /contact/
//@access private
const createContact = asyncHandler(async (req, res) => { //create contacts
    // console.log(`The request body is :`, req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(constants.BAD_REQUEST);
        throw new Error("All fields are Mandatory");
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id,
    });
    res.status(constants.CREATED).json(contact);
});




//@desc Get contact with id
//@route GET /contact/:id
//@access private
const getContact = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const contact = await Contact.findById(id);
    if (!contact) {
        res.status(constants.NOT_FOUND);
        throw new Error("Contact not found")
    } else {
        if (contact.user_id.toString() !== req.user.id) {
            res.status(constants.FORBIDDEN);
            throw new Error("User is Not Authorized to perform this action!");
        }
        res.status(constants.OK).json(contact)
    };
});





//@desc Update contact
//@route PATCH /contact/:id
//@access private
const updateContact = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const contact = await Contact.findById(id);
    if (!contact) {
        res.status(constants.NOT_FOUND);
        throw new Error('Contact not Found');
    } else {
        //Make sure the User is updating their own contact
        if (contact.user_id.toString() !== req.user.id) {
            res.status(constants.UNAUTHORIZED);
            throw new Error("Not authorized");
        }
        const updateContact = await Contact.findByIdAndUpdate(id, req.body);
        if (updateContact) {
            const updatedContact = await Contact.findById(id)
            res.status(constants.CREATED).json({ updatedContact });
        } else {
            res.status(constants.INTERNAL_SERVER_ERROR);
            throw new Error("Failed To Update The Contact.");
        }
    }
})







//@desc Delete Contact
//@route DELETE /contact/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const contact = await Contact.findById(id);
    if (!contact) {
        res.status(constants.NOT_FOUND);
        throw new Error('Contact Not found')
    }
    //Checking user is owner of this contact
    if (contact.user_id.toString() !== req.user.id) {
        res.status(constants.UNAUTHORIZED);
        throw new Error("You are not Authorized to perform this action")

    }
    await Contact.deleteOne({_id:id});
    res.status(constants.OK).json({ message: "Contact is deleted", Contact: contact })
});


module.exports = { getContacts, createContact, getContact, updateContact, deleteContact };