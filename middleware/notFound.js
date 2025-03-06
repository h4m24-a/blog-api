const notFound = (req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
}

module.exports = notFound;



// Catch all errors - on routes/endpoints that don't exist.
// Used as a catch-all for routes or endpoints that do not exist in your application.
// It creates a 404 Not Found error and passes it to the error-handling middleware via next().

// notFound middleware generates an error and forwards it to the errorHandler.