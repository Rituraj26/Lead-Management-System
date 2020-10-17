const ErrorResponse = require('../utils/ErrorResponse');
const DB = require('../config/db');
const { encrypt, decrypt } = require('../utils/encrypt');
// const { validatePassword } = require('../utils/validate');

const register = async (req, res, next) => {
    let { name, email, password } = req.body;

    if (password < 6) {
        return next(
            new ErrorResponse(
                'Password should be greater than 5 characters',
                400
            )
        );
    }

    try {
        const hashedPassword = encrypt(password);

        let sqlQuery = `insert into users (name, email, password) values('${name}', '${email}', '${hashedPassword}')`;
        await DB.query(sqlQuery);

        res.status(200).json({ msg: 'Sucessfully registered' });
    } catch (error) {
        if (error.errno === 1062) {
            return next(new ErrorResponse('You are already registered', 400));
        }
        return next(new ErrorResponse('Registration Unsuccessful', 400));
    }
};

const login = async (req, res, next) => {
    let { email, password } = req.body;

    try {
        let sqlQuery = `select * from users where email='${email}'`;
        const registeredUser = await DB.query(sqlQuery);

        if (!registeredUser.length) {
            return next(new ErrorResponse('User not registered', 400));
        }

        const checkPassword = await decrypt(
            password,
            registeredUser[0].password
        );

        if (!checkPassword) {
            return next(new ErrorResponse('Wrong password', 400));
        }

        res.status(200).json({ msg: 'Successfully logged in' });
    } catch (error) {
        return next(new ErrorResponse('Server Error', 500));
    }
};

module.exports = {
    register,
    login,
};
