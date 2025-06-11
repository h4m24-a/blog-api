const checkAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'ADMIN') {
    return next()   // User is an admin, continue to the next middleware/route handler
  } else {
    return res.status(403).json({ message: 'Access denied. Admins only.' })
  }
};

module.exports = checkAdmin;




//  this checkAdmin function simply checks that the user is logged in and has an admin role.