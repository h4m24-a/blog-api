const express = require('express');
const router = express.Router();
const { getAllPostsAdminController, getSinglePostAdmin, createPostController, updatePostController, deletePostController, togglePublish, deleteCommentAdminController } = require('../controllers/adminController');

// Protect dashboard route to only ADMIN only users
router.get('/dashboard', (req, res) => {              // GET /api/admin/dashboard
  const { username, role } = req.user       // Destructures username and role properites from authenticated user object stored in req.user
  res.json({
    message: `${username}, Welcome to Admin Dashboard `,
    username,          // Data from jwt payload
    role
  });
});


router.get('/posts', getAllPostsAdminController)                // GET all posts

router.get('/posts/:postId', getSinglePostAdmin);       // GET /api/admin/posts/:postId  - Single Post

router.post('/post', createPostController);              // POST /api/admin/posts

router.put('/posts/:postId', updatePostController);       // PUT /api/admin/posts/:postId

router.delete('/posts/:postId', deletePostController);    // DELETE /api/admin/posts/:postId




// Admin Delete comments
router.delete('/posts/:postId/comments/:commentId', deleteCommentAdminController )    // api/admin/posts/:postId/comments/:commentId




// Admin toggle posts 
router.patch('/posts/:postId/toggle', togglePublish)      // set publish to true or false depending on the value



module.exports = router;
