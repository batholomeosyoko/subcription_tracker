const errorMiddleware = ( req, res, next) => {
    try {
    let error = {...err};

    error.message = error.message;

    console.error(err);

 if (error.name === 'CastError') {
    const message = 'Resource not found';
    error = new Error(message);
    error.code = 404;
 }   
 if (error.code === 11000) {
    error = new Error('Duplicate key');
    error.code = 400;
 }

 //Mongoose validation error
 if (error.name === 'ValidationError') {
    error = new Error('Invalid data');
    error.code = 400;
 }

 // Mongoose CastError for invalid ObjectIds
 if (error.name === 'CastError' && error.kind === 'ObjectId') {
    error = new Error('Invalid resource ID');
    error.code = 400;
 }

 // Handle all other validation errors as 400
 if (error.code >= 400 && error.code < 500) {
    error = new Error(error.message);
    error.code = 500;
 }

 // Handle 500 errors for unhandled server errors
 if (error.code >= 500 || !error.code) {
    error = new Error('Internal server error');
    error.code = 500;
 }

 res.status(error.code).json({ message: error.message });

} catch(errror) {
    next(errror);
}
};

export default errorMiddleware;