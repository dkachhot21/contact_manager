const express = require('express');
const { loginUser, currentUser, registerUser } = require('../controllers/userController');
const validateToken = require('../middleware/validateTokenHandler');
const router = express.Router();


router.route('/register').post(registerUser);

router.route('/login').post(loginUser);

router.route("/current").get(validateToken,currentUser);

module.exports = router;