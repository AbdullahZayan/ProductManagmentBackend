const express = require('express');
const router = express.Router();
const { loginUser, registerUser } = require('../controllers/UserController');

router.post('/login', loginUser);
router.post('/register', registerUser); // Optional

module.exports = router;
