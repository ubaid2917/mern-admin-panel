const router = require('express').Router();

router.use('/user', require('../controllers/user/index'))
router.use('/patient', require('../controllers/patient/index'))
router.use('/auth', require('../controllers/auth/index'))

module.exports = router