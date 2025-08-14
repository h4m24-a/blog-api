const db = require('../prisma/queries');
const { validationResult } = require("express-validator");


// GET /posts/:postId/comments/:commentId    - a single comment of a post
async function getSingleCommentOfPostController(req, res) {
  try {
    const postId = parseInt(req.params.postId, 10);
    const commentId = parseInt(req.params.commentId, 10)

    const comment = await db.getSingleCommentOfPost(commentId, postId)

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' })
    }

    res.json(comment)
  } catch (error) {
    res.status(500).json({ error:'Failed to retrieve comment' })
  }
}



// POST posts/:postId/comments/   - Create a new comment on a post 
async function createCommentController(req, res) {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // Return 400 with error details
      return res.status(400).json({
        errors: errors.array(), // this gives you an array of error messages
      });
    }

  try {
    const postId = parseInt(req.params.postId, 10); // postId extracted from URL
    const userId = req.user.id; // From JWT middleware
    const { content } = req.body;   // Grabs comment content from request body


    const comment = await db.createComment (postId, userId, content)
    
  
    res.status(201).json( {
      comment: comment,
      message: "Comment Created"
    })

  } catch (error) {
    res.status(500).json({ error:'Failed to create comment' })
  }
  
}


// PUT posts/:postId/comments/:commentId  - Update comment using post Id and comment Id
async function updateCommentController(req, res) {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // Return 400 with error details
    return res.status(400).json({
      errors: errors.array(), // this gives you an array of error messages
    });
  }

  try {
    const userId = req.user?.id;
    const postId = parseInt(req.params.postId, 10);
    const commentId = parseInt(req.params.commentId, 10);
    const { updatedContent } = req.body;
    
    
    const comment = await db.getSingleCommentOfPost(commentId);

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' })
    }

     if (comment.postId !== postId) {
      return res.status(404).json({ error: 'Comment does not belong to this post' });
    }

    if (comment.userId !== userId) {
      return res.status(404).json({ error: 'You are not authorized to edit this comment' });
    }

    const updatedComment = await db.updateComment(commentId, updatedContent);
    
    res.status(200).json( { updatedComment, message: 'Updated comment successfully' })
    

  } catch (error) {
    res.status(500).json({ error: 'Failed to update commment' });
  }
}



// DELETE posts/:postId/comments/:commentId   - Delete comment using post id and comment id
async function deleteCommentController(req, res) {
  try {
    const commentId = parseInt(req.params.commentId);
    const userId = req.user?.id;

    const comment = await db.getSingleCommentOfPost(commentId);

    
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' })
    }


    if (comment.userId !== userId) {
      return res.status(403).json({ error: 'You are not authorized to delete this comment' })
    }

    const id = comment.id

    await db.deleteComment(id)

    res.status(204).json({ message: 'Comment deleted',});
    
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete comment' })
  }
}


module.exports = {
  getSingleCommentOfPostController,
  createCommentController,
  updateCommentController,
  deleteCommentController
}