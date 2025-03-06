// Error handler middleware
const errorHandler = (err, req, res, next) => {
  if (err.status) {     
    res.status(400).render('404');

  } else {    // else if there is no status defined, we set the error to 500
    res.status(500).json({message: err.message}); 
  }
}

// We don't want a default status of 404, we want to check if we set a status in the route, if we didn't, then we want a 500 status by default which means there's a server error

module.exports =  errorHandler;


// Here we handle all errors using this code.

// This middleware is called only when an error is passed to next(err).
// It is the final middleware in the chain, responsible for formatting and sending the error response.