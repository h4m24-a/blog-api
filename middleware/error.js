// Error handler middleware
const errorHandler = (err, req, res, next) => {

  // If the errors has a status code, use it; otherwise default to 500
  const statusCode = err.status || 500;

  // Set a default message if there's no message in the error
  const message = err.message || 'Internal Server Error'

  // Send the response with the correct status code and message
 res.status(statusCode).json({
    error: statusCode === 404 ? 'Not Found' : 'Error',
    message: statusCode === 404
      ? 'The requested resource could not be found'
      : message,
  });
}


module.exports =  errorHandler;


// Here we handle all errors using this code.

// This middleware is called only when an error is passed to next(err).
// It is the final middleware in the chain, responsible for formatting and sending the error response.


// We don't want a default status of 404, we want to check if we set a status in the route, if we didn't, then we want a 500 status by default which means there's a server error


// Custom error message -  If the error has a message (err.message), it uses that. If not, it falls back to 'Internal Server Error'.

// checks err.status but defaults to 500 if it's not set. This means any error without a status will be treated as a server error.


/*
  If statusCode === 404:

  error becomes "Not Found"

  message becomes "The requested resource could not be found"
  

  For any other status code (including 500, 400, 403, etc.):

  error becomes "Error"

  message uses the value of err.message, or "Internal Server Error" if none is provided
*/