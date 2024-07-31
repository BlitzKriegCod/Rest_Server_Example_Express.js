const {Router} = require('express');
const { getUsers, postUsers } = require('../controllers/user.controller');
const {validateUserFields,validateFields} = require('../middlewares/validators');

const router = Router();
router.get("/", getUsers);
router.post('/', [validateUserFields('name','email','password','role'),validateFields] ,postUsers)
 
module.exports = router