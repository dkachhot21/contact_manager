//contactRoutes.js
const express = require('express');
const router = express.Router();
const { getContacts, createContact, getContact, updateContact, deleteContact } = require('../controllers/contactController');
const validateToken = require('../middleware/validateTokenHandler');

router.use(validateToken); // Validate the token before any route is accessed

/**
 * @swagger
 * /contact:
 *  get:
 *      tags:
 *          - 2.) Authorization and CRUD
 *      summary: "Returns all Contacts of the current user"
 *      description: "returns all documents from database under the current user _id"
 *      security:
 *          - bearerAuth: []
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: "All contacts"
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                      example:
 *                          "name" : "contact1"
 *                          "email": "contact1@root.com"
 *                          "phone": "00000000"
 *
 */
router.route("/").get(getContacts);

/**
 * @swagger
 * /contact:
 *  post:
 *      tags:
 *          - 2.) Authorization and CRUD
 *      summary: "adds contact to database"
 *      description: "adds document in mongodb based on current user _id"
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              default: contact1
 *                              type: string
 *                          email:
 *                              default: contact1@root.com
 *                              type: string
 *                          phone:
 *                              default: 111111
 *                              type: string
 *              example:
 *                  username: "contact1"
 *                  email: "contact1@root.com"
 *                  password: "111111"
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: "created contact"
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                      example:
 *                          "name": "ObjectId"
 *                          "email": "contact@root.com"
 *                          "phone": "111111"
 *
 */
router.route("/").post(createContact);

/**
 * @swagger
 * /contact/{id}:
 *  get:
 *      tags:
 *          - 2.) Authorization and CRUD
 *      summary: "returns single contact"
 *      description: "return single contact with respect to given id"
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: path
 *            Required: True
 *            name: id
 *            schema:
 *              type: ObjectId
 *            description: "numeric id of contact to get"
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: "returned contact"
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                      example:
 *                          "name": "contact12"
 *                          "email": "contact12@root.com"
 *                          "phone": "111111"
 *
 */
router.route("/:id").get(getContact);

/**
 * @swagger
 * /contact/{id}:
 *  put:
 *      tags:
 *          - 2.) Authorization and CRUD
 *      summary: "updates single contact"
 *      description: "updates single contact with respect to given id"
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: path
 *            Required: True
 *            name: id
 *            schema:
 *              type: ObjectId
 *            description: "numeric id of contact to update"
 *      requestBody:
 *          description: "content you want to change"
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              default: contact1
 *                              type: string
 *                          email:
 *                              default: contact1@root.com
 *                              type: string
 *                          phone:
 *                              default: 111111
 *                              type: string
 *              example:
 *                  username: "contact1"
 *                  email: "contact1@root.com"
 *                  password: "111111"
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: "updated contact"
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                      example:
 *                          "name": "contact1_new"
 *                          "email": "new_contact@root.com"
 *                          "phone": "111111"
 *
 */
router.route("/:id").put(updateContact)

/**
 * @swagger
 * /contact/{id}:
 *  delete:
 *      tags:
 *          - 2.) Authorization and CRUD
 *      summary: "deletes single contact"
 *      description: "deletes single contact with respect to given id"
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: path
 *            Required: True
 *            name: id
 *            schema:
 *              type: ObjectId
 *            description: "numeric id of contact to delete"
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: "Deleted contact"
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                      example:
 *                          "name": "contact1"
 *                          "email": "contact1@root.com"
 *                          "phone": "111111"
 *
 */
router.route("/:id").delete(deleteContact);

module.exports = router; 