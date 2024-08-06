const {Router} = require('express')
const {check} = require('express-validator')
const {login} = require('../controllers/auth.controller')
const { validate } = require('../models/user.model')
const { validateUserFields, validateFields } = require('../middlewares/validators')


const router = Router()
router.post('/login',[check('email','You need send an email address example@gmail.com').isEmail(),
    check('password','Something is wrong with the password, check this again :)').not().isEmpty(),validateFields],login);

module.exports = router