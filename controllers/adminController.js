const db = require('../prisma/queries');

// GET /admin/posts
async function getAllPostsAdminController(req, res) {
  try {

    const posts = await db.getAllPostsAdmin();
    
    if (!posts) {
      return res.status(404).json({ message: 'Admin posts not found' })
    }

    res.json(posts)

  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}



// GET a specific post and comments
async function getSinglePostAdmin(req, res) {
  try {
    const postId = parseInt(req.params.postId, 10)

    const posts = await db.getSinglePostAdmin(postId)

    if (!posts) {
      return res.status(404).json({ message: 'Admin post not found' })
    }

    res.json(posts)
    
  } catch (error) {
     return res.status(500).json({ error: 'Internal Server Error' })
  }
}



// Create a new post
async function createPostController(req, res) {
  try {
    const { title, content } = req.body;
    const authorId = req.user.id

    await db.createPost(title, content, authorId)
    res.status(201).json({ message: 'Post created successfully' });
    
  } catch (error) {
   return res.status(500).json({ error: 'Internal Server Error' })
  }
}



// Update post
async function updatePostController(req, res) {
  try {
    const postId = parseInt(req.params.postId, 10);
    const { title, content } = req.body;

    const updatedPost = await db.updatePost(postId, title, content);

    res.json({
      updatedPost,
      message: "Updated post successfully"
    })

  } catch (error) {
    return res.status(500).json({ error: 'Failed to update post' })
    
  }
}


// Delete post
async function deletePostController(req, res) {
  try {
    const postId = parseInt(req.params.postId)

    await db.deletePost(postId);

    return res.json({ message: 'Post deleted successfully' });

  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete posts' })
  }
}



// Toggle publish to true or false
async function togglePublish(req, res) {
  try {
    const postId = parseInt(req.params.postId, 10);

    const post = await db.getSinglePostAdmin(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }
    const updatedPublishStatus = await db.togglePublishStatus(postId, post.published);

    return res.json({ 
      updatedPublishStatus,
      message: `Updated publish status to ${updatedPublishStatus.published}`
    })
    
  } catch (error) {
    return res.status(500).json({ error: 'Failed to toggle publish status'  })
  }
}


// Delete a comment on a post (admin)
async function deleteCommentAdminController(req, res) {
  try {
    const postId = parseInt(req.params.postId, 10);
    const commentId = parseInt(req.params.commentId, 10);

    const comment = await db.getSingleCommentOfPost(commentId);   // Get comment object for extra info like postId

    if (comment.postId !== postId) {                  // If the post ID associated with the comment does not match the post ID in the URL, then return a 404.
      return res.status(404).json({ message: 'Comments not found for this post' })
    }

    
    await db.deleteComment(commentId);    // call query to delete comment and pass in comment id

    return res.json({ message: 'Comment deleted successfully by admin' })
    
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete comment' })
  }
}



// Edit a user comment on a post (admin)

async function updateCommentAdminController(req, res) {

  try {
    const postId = parseInt(req.params.postId, 10); // postId extracted from URL
    const commentId = parseInt(req.params.commentId, 10); // commentId extracted
    const { updatedContent } = req.body   // Grabs comment content from request body


    const comment = await db.getSingleCommentOfPost(commentId);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' })
    }

      if (comment.postId !== postId) {
      return res.status(400).json({ error: 'Comment does not belong to this post' });
    }


    const updatedComment = await db.updateComment(commentId, updatedContent)

    res.status(200).json({ updatedComment, message: 'Comment updated successfully by admin'})



  } catch (error) {
    return res.status(500).json({ error: 'Admin failed to update comment'})
  }

}

module.exports = {
  getAllPostsAdminController,
  getSinglePostAdmin,
  createPostController,
  updatePostController,
  deletePostController,
  togglePublish,
  deleteCommentAdminController,
  updateCommentAdminController,
}