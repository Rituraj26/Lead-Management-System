const bcrypt = require('bcryptjs');

const encrypt = async (value) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(value, salt);
    return hash;
};

const decrypt = async (enteredPassword, hashedPassword) => {
    const checkPassword = await bcrypt.compare(enteredPassword, hashedPassword);
    return checkPassword;
};

module.exports = {
    encrypt,
    decrypt,
};
