// Middleware to handle 404 Not Found errors
const notFound = (req, res, next) => {
    // Create a new error object with the requested URL
    const error = new Error(`Not Found - ${req.originalUrl}`);
    
    // Set response status to 404
    res.status(404);
    
    // Pass the error to the next middleware
    next(error);
  };
  
  // Middleware to handle general errors
  const errorHandler = (err, req, res, next) => {
    // If the response status is still 200 (OK), change it to 500 (Internal Server Error)
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    
    // Get the error message
    let message = err.message;
  
    // Handle Mongoose CastError (invalid MongoDB ObjectId)
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
      statusCode = 404; // Change status to 404 (Not Found)
      message = 'Resource not found'; // Custom error message
    }
  
    // Send JSON response with error details
    res.status(statusCode).json({
      message: message, // Send the error message
      stack: process.env.NODE_ENV === 'production' ? null : err.stack, // Hide stack trace in production
    });
  };
  
  // Export the middlewares to use in other parts of the application
  export { notFound, errorHandler };
  