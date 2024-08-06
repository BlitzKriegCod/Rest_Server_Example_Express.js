const JWT = require('jsonwebtoken')


module.exports.ValidateJWT = (req,res,next)=>{

    let tk = req.header('Authorization')
    /**/
    if(!tk){
        res.status(401).json({
            msg:"Token Unexpected"
        })

    }

    try {
        if(JWT.verify(tk,process.env.SECRETKEY)){
        console.log(tk)
        next()}
            
    } catch (error) {
    res.status(401).json({
        msg:'Token invalid'
    })        
    }

}