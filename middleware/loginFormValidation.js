const { validationResult } = require('express-validator');


// Function to handle validation errors on loginform

function LogInValidationErrors(req, res, next) {

  const errors = validationResult(req);
  
  // If there are validation errors (e.g., missing username or password)
  if (!errors.isEmpty()) {
    return res.render('login_form', {
      errors: errors.array()  // Pass form validation errors to the view
    });
  }



  // If there isn't validation errors, called the next middleware function or route handler
  next()
}

module.exports = LogInValidationErrors