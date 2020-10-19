const ErrorResponse = require('../utils/ErrorResponse');
const DB = require('../config/db');
const { encrypt, decrypt } = require('../utils/encrypt');

const getLeads = async (req, res) => {
    const sqlQuery = `select * from leads`;

    try {
        const onBoardLeads = await DB.query(sqlQuery);

        res.status(200).json({ msg: 'success', onBoardLeads: onBoardLeads });
    } catch (error) {
        res.status(400).json({ msg: 'failure' });
    }
};

const addLead = async (req, res) => {
    const { first_name, last_name, email } = req.body;
    const sqlQuery = `insert into leads (first_name, last_name, email) values ('${first_name}', '${last_name}', '${email}')`;

    try {
        const newLead = await DB.query(sqlQuery);

        res.status(201).json({ msg: 'success', newLead: newLead });
    } catch (error) {
        res.status(400).json({ msg: 'failure' });
    }
};

module.exports = {
    getLeads,
    addLead,
};
