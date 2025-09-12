const { PrismaClient } = require('@prisma/client')   // This imports the PrismaClient class from the @prisma/client package.

const prisma = new PrismaClient();    // creates an instance of PrismaClient, The prisma object acts as your connection to the database and provides methods to interact with different tables



//! Posts

// Get all posts
async function getAllPosts() {        // Only return posts if they are set to true & include author field and only return username.
  try {
    return await prisma.post.findMany( {
      orderBy: {
        createdAt: 'asc',
      },
      include: {
        author: {
          select: {
            username: true
          }
        }
      },
      where: {
        published: true
      }
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
}


// Get all posts for admin  (published excluded)
async function getAllPostsAdmin() {
  try {
    return await prisma.post.findMany({
      include: {
        author: {
          select: {
            username: true
          }
        },
      },
    });
  } catch (error) {
    console.error('Error fetching posts');
    throw error;
  }
}


// Create a new post
async function createPost(title, content, authorId) {
  try {
    await prisma.post.create({
      data: {
        title: title,
        content: content,
        authorId: authorId,
      },
    });
  } catch (error) {
    console.error('An error occurred during query', error);
    throw error;
  }
}


// Update Post
async function updatePost(postId, title, content) {
  try {
    await prisma.post.update({
      where: {
        id: postId
      },
      data:{
        title: title,
        content: content
      }
    })
  } catch (error) {
    console.error('An error occurred during updating post', error);
    throw error
  }
}


// Delete Post
async function deletePost(postId) {
  try {
    await prisma.post.delete({
      where: {
        id: postId,
      },
    });
  } catch (error) {
    console.error('An error occurred during deleting post:', error);
    throw error;
  }
}



// Update post - Publish to false or false
async function togglePublishStatus(postId, publishStatus) {
  try {
    const updatedPostStatus = await prisma.post.update({
      where:{
        id: postId
      },
      data: {
        published: !publishStatus    // flips the boolean value, so true to false and false to true
      }
    });

    return updatedPostStatus
  } catch (error) {
    console.error('An error occurred during updating post:', error);
    throw error;
  }
}




// Get a specific post and display comments
async function getPostAndComments(postId) {
  try {
    return await prisma.post.findFirst({
      where: {
        id: Number(postId),
        published: true,
      },
      include: {
        author: {
          select: {
            username: true, // Only return username of post author
            id: true,
          }
        },
        comments: {
          orderBy: {
            createdAt: 'asc'
          },
          select: {
            id: true,
            createdAt: true,
            content: true, // Comment content
            postId: true,
            user: {
              select: {
                username: true, // Only return username of comment author,
                id: true,
              }
            }
          }
        }
      }
    });
  } catch (error) {
    console.error('An error occurred when fetching post', error);
    throw error;
  }
}


// Get a specific post and display comments (admin)
async function getSinglePostAdmin(postId) {
  try {
    return await prisma.post.findUnique({
      where: {
        id: Number(postId),
      },
      include: {
        author: {
          select: {
            username: true
          }
        },
        comments: {
          orderBy: {
            createdAt: 'asc'
          },
          select: {
            id: true,
            createdAt: true,
            content: true,
            user: {
              select: {
                username: true,
                id: true,
              }
            }
          }
        }
      }
    })
  } catch (error) {
    console.error('Error fetching post', error);
    throw error
  }
}



// Get all posts by a specific user
async function getAllPostsByUserId(userId) {
  try {
    return await prisma.post.findMany({
      where: {
        authorId: userId
      },
      orderBy: {
        createdAt: 'dsc'
      },
      include: {
        comments: true
      }
    })
  } catch (error) {
    console.error('Error fetching posts', error);
    throw error
  }
  
}



//! Comments


// Get all comments of a post using post id
async function getAllCommentsOfPost(postId) {
  try {
    const comments =  await prisma.comment.findMany({
      where: {
        postId
      },
      include: {
        user:{
          select: {
            username: true
          }
        },
      },
    })

    return comments;

  } catch (error) {
    console.error('Error fetching all comments for post', error);
    throw error
  }
}

// Insert Comment - using post Id and user Id
async function createComment(postId, userId, content) {
  try {
    const comment = await prisma.comment.create({
      data: {
        content,
        postId,
        userId
      },
      include: {
        user: {
          select: {
            username: true,
          }
        }
      }
    });

    return comment;

  } catch (error) {
    console.error('Error creating comment:', error);
    throw error;
  }
}








// Update Comment
async function updateComment(commentId, updatedContent) {
  try {
    return await prisma.comment.update({
      where: {
        id: commentId
      },
      data: {
        content: updatedContent
      }
    })
  } catch (error) {
    console.error('Error updating comment', error);
    throw error 
  }
}




// Delete Comment 
async function deleteComment(commentId) {
  try {
    await prisma.comment.delete({
      where: {
        id: commentId
      }
    })
  } catch (error) {
    console.error('Error deleting comment', error);
    throw error 
  }
}




// Get a single comment by id
async function getSingleCommentOfPost(commentId) {
  try {
    return await prisma.comment.findFirst({
      where: {
        id: commentId,
      },
      select: {
        id: true,
        content: true,
        postId: true,
        userId: true,
        user: {
          select: {
            username: true
          }
        }
      }
    });
  } catch (error) {
    console.error('Error fetching comment', error);
    throw error;
  }
}




//! Auth Routes


// Insert username & password to database
async function insertUser(username, password) {       
  try {
    return await prisma.user.create( {
      data: {
        username: username,
        password: password
      }
    });
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}





// Get user by username
async function findUserByUsername(username) {
  try {
   const user = await prisma.user.findUnique({
      where: {
        username
      }
    });
    return user
  } catch (error) {
    console.error('Error finding user', error);
    throw error
  }
  
}



// Get user by ID
async function selectUserById(id) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id
      }
    })
    return user
  } catch (error) {
    console.error('Error finding user', error);
    throw error;
    
  }
}



//! JWT

// Store refresh token of user
async function storeRefreshToken(userId, refreshToken) {
  try {
    await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        refreshToken
      }
    })

  } catch (error) {
    console.error('Error storing refresh token', error)
    throw error
  }
}



// Get refresh token by user id
async function getRefreshTokenByUserId(userId) {
  try {
    const user = await prisma.user.findUnique({
      select: {
        refreshToken: true                        // return refresh token
      },
      where: {                                       // Using id of user
        id: userId
      }
    })
    return user?.refreshToken         // Return user.refreshtoken if user is not null or undefined.
  } catch (error) {
    console.error('Failed to retrieve refresh token of user', error)
    throw error
  }

}



// Delete refresh token from user
async function deleteRefreshToken(userId) {
  try {
    await prisma.user.update({
      data:{
        refreshToken: null
      },
      where: {
        id: userId
      }
    })
    
  } catch (error) {
    console.error('Failed to delete refresh token', error)
    throw error
  }
}




module.exports = {
  getAllPosts,
  getAllPostsAdmin,
  getSinglePostAdmin,
  getPostAndComments,
  getAllPostsByUserId,
  createPost,
  updatePost,
  deletePost,
  togglePublishStatus,

  getAllCommentsOfPost,
  getSingleCommentOfPost,
  createComment,
  updateComment,
  deleteComment,

  insertUser,
  findUserByUsername,
  selectUserById,

  storeRefreshToken,
  getRefreshTokenByUserId,
  deleteRefreshToken
}