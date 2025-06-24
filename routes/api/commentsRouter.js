const express = require('express');
const { getSingleCommentOfPostController, createCommentController, updateCommentController, deleteCommentController  } = require('../../controllers/commentsController')
const router = express.Router({ mergeParams: true })

// GET a specific comment on a post
router.get('/:commentId', getSingleCommentOfPostController);


// CREATE a new comment on a post
router.post('/', createCommentController );



// UPDATE a specific comment on a post
router.put('/:commentId', updateCommentController );



// DELETE a specific comment on a post
router.delete('/:commentId', deleteCommentController);



module.exports = router;




/*
mergeParams: true

By defauly express doesn't pass the :postId paramter from the parent route in app.js to this child router 
which is why the / route wasn't grabbing the postId from url.


mergeParams: true tells express to carry over any params from the parent route when commentsRouter is mounted.



mergeParams: true is required to access parent route parameters like :postId inside a nested router.

Without it, req.params in commentsRouter will only include parameters defined within the router itself, not the parent path where it's mounted.

*/