const {Router} = require('express')
const {check,validationResult} = require('express-validator')
const {login} = require('../controllers/auth.controller')
const { validate } = require('../models/user.model')
const { validateUserFields, validateFields } = require('../middlewares/validators')
const {ValidateJWT} = require('../middlewares/validate-jwt')

const router = Router()
router.post('/login',[
    check('email','You need send an email address example@gmail.com').isEmail(),
    check('password','Something is wrong with the password, check this again :)').not().isEmpty(),
    (req, res, next)=>{
        const err = validationResult(req);
        if(!err.isEmpty()){
            res.status(400).json(err)
        }
        next()
    }],login);

module.exports = router