const { Router } = require('express');
const { check } = require('express-validator');

const {ValidateJWT} = require('../middlewares/validate-jwt');

const { createProduct,
        obtProducts,
        obtProduct,
        updateProduct, 
        deleteProduct } = require('../controllers/product.controller');
        const { isAdmin } = require("../middlewares/validate-role");


const { genericValidator } = require('../middlewares/validators');
const Product = require("../models/categories.model")

const router = Router();

router.get('/', obtProducts );

router.get('/:id',[
    check('id', 'Id must be a mongoId').isMongoId(),
    async(req,res,next)=>{
        const {id} = req.params
        
        const prd = await Product.findOne(id);

        if(prd === null){
            return res.status(400).json({
                msg:`Product don't exist`
            })
        } 
        next()
        

    },
    genericValidator,
], obtProduct );


router.post('/', [ 
    ValidateJWT,
    check('name','Name is required').not().isEmpty(),
    check('category','Id Must be a MongoId').isMongoId(),
        
    genericValidator
], createProduct );


router.put('/:id',[
    ValidateJWT,
    check('id','Id Category Must be a MongoId').isMongoId(),
    check('id').custom( async(req,res,next)=>{
        const {id} = req.params
           const prd = await Product.findById(id)
           if(prd !== null){
            next()
           }else{
            res.status(400).json({
                msg:`Product don't exist`
            })
           }
    
    }),
    genericValidator
], updateProduct );


router.delete('/:id',[
    ValidateJWT,
    isAdmin,
    check('id', 'Id Must be a Mongo ID').isMongoId(),
    check('id').custom( async(req,res,next)=>{
    const {id} = req.params
       const prd = await Product.findById(id)
       if(prd !== null){
        next()
       }else{
        res.status(400).json({
            msg:`Product don't exist`
        })
       }

}),
    genericValidator
], deleteProduct);


module.exports = router;