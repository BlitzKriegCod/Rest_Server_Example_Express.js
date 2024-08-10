const {
    Router
} = require('express')
const {
    check,validationResult
} = require('express-validator')
const {ValidateJWT} = require('../middlewares/validate-jwt')
const {genericValidator} = require('../middlewares/validators')
const {getCategories,getCategoriesById,createCatg, deleteCatg} = require('../controllers/categories.controller.js')

const categoriesModel = require('../models/categories.model')
const { isAdmin } = require('../middlewares/validate-role.js')

const router = Router();
router.get('/', getCategories)

router.get('/:id', [check('id','Id Must be a mongoId').isMongoId(),genericValidator],getCategoriesById)

router.post('/',[ValidateJWT,isAdmin,check('name','Cat_Name is required').not().isEmpty(),async(req,res,next) => {
    const {name} = req.body
    const catg = await categoriesModel.findOne({name})
 
    if(catg !== null){
        return res.status(400).json({
            msg:'Categorie already exist'
        })
      
    }
    next()
},genericValidator],createCatg)


router.put('/:id',[ValidateJWT,isAdmin,check('id','Id Must be a mongoId and is required').isMongoId().not().isEmpty(),
    ,genericValidator
] ,updateCatg)
router.delete('/:id',[ValidateJWT,isAdmin,check('id','Id Must be a mongoId and is required').isMongoId().not().isEmpty(),
    ,genericValidator
] ,deleteCatg)
module.exports = router