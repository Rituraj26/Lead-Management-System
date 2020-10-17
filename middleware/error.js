const ErrorResponse = require('../utils/ErrorResponse');

const errorHandler = (err, req, res, next) => {
    console.log(Object.keys(err));
    let error = { ...err };
    error.message = err.message;
    console.log(error, err.message);

    // if (err.name === 'CastError') {
    //     const message = `Resource not found`;
    //     error = new ErrorResponse(message, 404);
    // }
    // console.log('=-', err, typeof err);

    // if(error.)

    // Password Validation
    // if()

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error',
    });
};

module.exports = errorHandler;
