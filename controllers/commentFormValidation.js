const { body } = require('express-validator');  // form validation

const validateComment = [
  body('content')
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage('Comment must be between 1 and 50 characters long.')
    .escape(), // Sanitization: Escape special characters
];


const validateUpdateComment = [
  body('updatedContent')
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage('Comment must be between 1 and 50 characters long.')
    .escape(), // Sanitization: Escape special characters
];




module.exports = { validateComment, validateUpdateComment  };