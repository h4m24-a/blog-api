const express = require('express');
const router = express.Router()
const { getUserProfile } = require('../../auth/authController');


router.get('/user', getUserProfile);    // Displays data about user: id, username, role

module.exports = router;