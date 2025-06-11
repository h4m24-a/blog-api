const express = require('express');
const router = express.Router();
const { getSignUp, getLogin, signUpPost, logInUserPost } = require('../auth/authController');
const logoutController = require('./logoutController');
const refreshTokenController = require('./refreshTokenController');
const { validateUserLogIn, validateUserSignUp } = require('../auth/authFormValidation');
const LogInValidationErrors = require('../middleware/loginFormValidation')
const passport = require('./passportJwtConfig');


// router.get('/sign-up', getSignUp)                              // Renders sign up form

router.post('/sign-up', validateUserSignUp, signUpPost)              // Creates and submits new user after signup


// router.get('/log-in', getLogin)                             // Renders login form


router.post('/log-in', LogInValidationErrors, validateUserLogIn, logInUserPost)               // Submits user login data




router.post('/logout', logoutController)               // Logs out user


router.get('/refresh', refreshTokenController)   // Obtain new access token when they expire using refresh token


module.exports = router;