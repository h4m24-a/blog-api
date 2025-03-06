const express = require('express');
const router = express.Router()



router.get('/posts/:postId/comments')     //! Get the comments of a post - in comments route or posts route?

router.post('/posts/:postId/new')     // Create a new comment



router.put('/posts/:postId/update/:commentId')          // Update a comment

router.delete('/posts/:postId/delete/:commentId')       // Delete  a comment




module.exports = router;