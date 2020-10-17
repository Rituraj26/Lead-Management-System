const ErrorResponse = require('./ErrorResponse');

const validatePassword = (password) => {
    let errors = [];

    if (password.length < 6) {
        // errors.push({
        //     message: 'Password length should be more than 5',
        //     statusCode: 400,
        // });
        errors.push(new ErrorResponse('Password length', 400));
    }
    console.log(errors, errors.message, errors.statusCode);
};

module.exports = { validatePassword };
