const express = require('express');
const router = express.Router()


router.get('/', (req, res) => {  res.send('/posts route!') });          // Get all posts 

router.get('/:postId');       // Get posts by id

router.post('/')          // Create new post

router.put('/:postId')        // Update post

router.delete('/:postId')     // Delete post


router.get('/:postId/comments')     // Get the comments of a post



module.exports = router;