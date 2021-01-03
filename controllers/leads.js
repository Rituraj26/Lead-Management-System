const ErrorResponse = require('../utils/ErrorResponse');
const DB = require('../config/db');
const { encrypt, decrypt } = require('../utils/encrypt');

const getLeads = async (req, res, next) => {
    const sqlQuery = `select * from leads`;

    try {
        const onBoardLeads = await DB.query(sqlQuery);

        res.status(200).json({ type: 'success', onBoardLeads: onBoardLeads });
    } catch (error) {
        return next(new ErrorResponse('Server Error', 400));
    }
};

const addLead = async (req, res, next) => {
    const {
        firstName,
        lastName,
        email,
        leadSource,
        leadStatus,
        leadIntent,
    } = req.body;
    const sqlQuery = `insert into leads (firstName, lastName, email, leadSource, leadStatus, leadIntent) values ('${firstName}', '${lastName}', '${email}', '${leadSource}', '${leadStatus}', '${leadIntent}')`;

    try {
        let lead = await DB.query(sqlQuery);

        lead = Object.assign({ id: lead.insertId }, req.body);

        res.status(201).json({
            type: 'success',
            data: lead,
        });
    } catch (error) {
        if (error.errno === 1062) {
            return next(
                new ErrorResponse(
                    'Lead with this email is already present',
                    400
                )
            );
        }
        return next(new ErrorResponse('Server Error', 500));
    }
};

const editLead = async (req, res, next) => {
    const {
        firstName,
        lastName,
        email,
        leadSource,
        leadStatus,
        leadIntent,
    } = req.body;

    const sqlQuery = `update leads set firstName='${firstName}', lastName='${lastName}', email='${email}', leadSource='${leadSource}', leadStatus='${leadStatus}', leadIntent='${leadIntent}' where id=${req.params.leadId}`;

    try {
        let lead = await DB.query(sqlQuery);

        if (!lead.affectedRows) {
            return next(
                new ErrorResponse(
                    `Lead with id ${req.params.leadId} not found`,
                    400
                )
            );
        }

        lead = Object.assign({ id: parseInt(req.params.leadId) }, req.body);

        res.status(200).json({ type: 'success', data: lead });
    } catch (error) {
        if (error.errno === 1062) {
            return next(
                new ErrorResponse(
                    'Lead with this email is already present',
                    400
                )
            );
        }
        return next(new ErrorResponse('Server Error', 500));
    }
};

const deleteLead = async (req, res, next) => {
    const leadIds = req.params.leadId.split(',');
    const sqlQuery = `delete from leads where id in (${leadIds})`;

    try {
        const result = await DB.query(sqlQuery);
        console.log(result);
        if (!result.affectedRows) {
            return next(
                new ErrorResponse(
                    `Lead with id ${req.params.leadId} not found`,
                    400
                )
            );
        }

        res.status(200).json({ type: 'success', msg: 'Successfully deleted' });
    } catch (error) {
        if (error.errno === 1062) {
            return next(
                new ErrorResponse(
                    'Lead with this email is already present',
                    400
                )
            );
        }
        return next(new ErrorResponse('Server Error', 500));
    }
};

module.exports = {
    getLeads,
    addLead,
    editLead,
    deleteLead,
};
