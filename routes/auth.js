const router = require('express').Router();

const { register } = require('../controllers/auth');

// Routes
router.route('/register').post(register);

module.exports = router;
