const express = require('express');
const router = express.Router()
const { getPosts, getPostAndCommentsController, getAllCommentsOfPostController } = require('../../controllers/postsController')

router.get('/', getPosts);    // Get all posts


//  Gets all comments that belong to a specific post.
router.get('/:postId/comments', getAllCommentsOfPostController ); 


// Get a single post by ID and its comments   - Fetches a single post by id with comments
router.get('/:postId', getPostAndCommentsController);





module.exports = router;