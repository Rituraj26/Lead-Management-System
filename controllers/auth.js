const ErrorResponse = require('../utils/ErrorResponse');
const db = require('../config/db');

const register = (req, res, next) => {
    let { name, email, password } = req.body;
    let sqlQuery = `insert into users (name, email, password) values('${name}', '${email}', '${password}')`;

    db.query(sqlQuery, (error, results, fields) => {
        if (error) {
            res.status(400).json({ msg: 'Registration unsuccessful' });
        } else {
            console.log(results);
            res.status(201).json({ msg: 'User registered successfully' });
        }
    });
};

const login = async (req, res) => {
    let { email, password } = req.body;
    let sqlQuery = `select * from users where email='${email}'`;
    try {
        const result = await db.query(sqlQuery);

        console.log(result);
        res.status(200).json({ msg: 'Successfully registered' });
    } catch (error) {
        res.status(400).json({ msg: 'Login unsucessfully' });
    }
};

module.exports = {
    register,
    login,
};
