const router = require('express').Router();

const { getLeads, addLead } = require('../controllers/leads');

// Routes
router.route('/onboard').get(getLeads);

router.route('/addlead').post(addLead);

module.exports = router;
