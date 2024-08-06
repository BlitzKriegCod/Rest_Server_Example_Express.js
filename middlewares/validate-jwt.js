const JWT = require('jsonwebtoken')
const User = require('../models/user.model')

module.exports.ValidateJWT = async(req,res,next)=>{

    let tk = req.header('Authorization')
    /**/
    if(!tk){
        res.status(401).json({
            msg:"Token Unexpected"
        })

    }

    try {
        if(JWT.verify(tk,process.env.SECRETKEY)){
        const {uid} = JWT.verify(tk,process.env.SECRETKEY)
        req.uid = uid

        const user = await User.findById(uid)
        if(!user){
            return res.status(401).json({
                msg:"User not exist"
            })
        }
            req.user = user
        console.log(tk)
       
       next()
    
    }
            
    } catch (error) {
    res.status(401).json({
        msg:'Token invalid'
    })        
    }

}