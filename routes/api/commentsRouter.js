const express = require('express');
const { getSingleCommentOfPostController, createCommentController, updateCommentController, deleteCommentController  } = require('../../controllers/commentsController')
const router = express.Router()

// GET a specific comment on a post
router.get('/:commentId', getSingleCommentOfPostController);


// CREATE a new comment on a post
router.post('/', createCommentController );



// UPDATE a specific comment on a post
router.put('/:commentId', updateCommentController );



// DELETE a specific comment on a post
router.delete('/:commentId', deleteCommentController);



module.exports = router;