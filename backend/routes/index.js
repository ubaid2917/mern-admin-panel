const router = require('express').Router();

router.use('/auth', require('../controllers/auth/index'))
router.use('/user', require('../controllers/user/index'))
router.use('/patient', require('../controllers/patient/index'))
router.use('/department', require('../controllers/department/index'))
router.use('/doctor', require('../controllers/doctor/index'))
router.use('/appointment', require('../controllers/appointment/index'))
router.use('/smartcard', require('../controllers/smartCard/index'))

module.exports = router