const express = require('express');
const router = express.Router();
const { getSignUp, getLogin } = require('../auth/authController')



router.get('/sign-up', getSignUp)               // Displays sign up form

router.post('/sign-up')              // Creates and submits new user signup



router.get('/log-in', getLogin)                // Displays login form

router.post('/log-in')               // Submits user login data




router.get('/logout')               // Logs out user




module.exports = router;