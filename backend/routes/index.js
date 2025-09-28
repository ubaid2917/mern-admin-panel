const router = require('express').Router();

router.use('/auth', require('../controllers/auth/index'))
router.use('/user', require('../controllers/user/index'))
router.use('/patient', require('../controllers/patient/index'))
router.use('/department', require('../controllers/department/index'))

module.exports = router