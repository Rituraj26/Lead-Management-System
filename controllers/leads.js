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
    const { first_name, last_name, email } = req.body;
    const sqlQuery = `insert into leads (first_name, last_name, email) values ('${first_name}', '${last_name}', '${email}')`;

    try {
        await DB.query(sqlQuery);

        res.status(201).json({
            type: 'success',
            msg: 'New lead added successfully',
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
    const { first_name, last_name, email, source, status, intent } = req.body;

    const sqlQuery = `update leads set first_name='${first_name}', last_name='${last_name}', email='${email}', source='${source}', status='${status}', intent='${intent}' where id=${req.params.leadId}`;

    try {
        const result = await DB.query(sqlQuery);

        if (!result.affectedRows) {
            return next(
                new ErrorResponse(
                    `Lead with id ${req.params.leadId} not found`,
                    400
                )
            );
        }

        res.status(200).json({ type: 'success', msg: 'Successfully edited' });
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
    const sqlQuery = `delete from leads where id=${req.params.leadId}`;

    try {
        const result = await DB.query(sqlQuery);

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
