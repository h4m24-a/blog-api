const db = require('../prisma/queries')   // importing query functions

// Get all Posts
async function getPosts(req, res) {
  try {
    const posts = await db.getAllPosts();
    res.render('index', {
      posts
    })
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).send('Internal Server Error')
  }
} 




module.exports = {
  getPosts
}