const router = require('express').Router();

const {
    getLeads,
    addLead,
    editLead,
    deleteLead,
} = require('../controllers/leads');

// Routes
router.route('/').get(getLeads).post(addLead);

router.route('/:leadId').put(editLead).delete(deleteLead);

module.exports = router;
