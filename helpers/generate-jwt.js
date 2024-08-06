const JWT = require('jsonwebtoken')


module.exports.generateJWT=(uid)=>{
    return new Promise((resolve, reject) => {
    
        const payload = {uid}
        JWT.sign(payload,process.env.SECRETKEY,{
            expiresIn:'4h'
        },(err,token)=>{
            if(err){
                console.log('Token not generated')
                reject(err)
            }else{
            resolve(token)
        }})

    })
}