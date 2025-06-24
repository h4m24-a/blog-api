const db = require('../prisma/queries')   // importing query functions

// GET /posts - Fetch all blog posts
async function getPosts(req, res) {
  try {
    const posts = await db.getAllPosts();     // Get posts from database

    if (!posts) {                                                   // If posts is not true, return 404 error
      return res.status(404).json({ error: 'Posts not found' })
    }

    res.json(posts)                           // Return response (posts) as JSON
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })    // Return JSON error message
  }
} 


// GET /posts/:postId   - single post by id and all comments
async function getPostAndCommentsController(req, res) {
  try {
    const postId = req.params.postId;
    const id = parseInt(postId, 10)

    const post = await db.getPostAndComments(id)

    if (!post) {
      return res.status(404).json({ error: 'Post not found'})
    }

    res.status(200).json(post)
    
  } catch (error) {
    res.status(500).json({ error:'Internal Server Error' })
  }
}









// GET /posts/:postId/comments         - Fetches all comments of a  post.
async function getAllCommentsOfPostController(req, res) {
  try {
    const postId = parseInt(req.params.postId) 

    
    const comments = await db.getAllCommentsOfPost(postId)
    
    if (!comments) {
      return res.status(404).json({ error: 'Comments not found'  })
    }
    
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch comments for post"})
  }
}

module.exports = {
  getPosts,
  getPostAndCommentsController,
  getAllCommentsOfPostController,
}