const db = require('../prisma/queries');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator')




// Render Sign Up form
async function getSignUp(req, res) {
  try {
    res.render('signup_form')
  } catch (error) {
    console.error('Error displaying sign up form', error);
    res.status(500).send('Server Error') 
  }
  
}



// Add User to Database






// Render Login page




module.exports = {
  getSignUp,
  

}