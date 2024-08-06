const { response } = require("express")
const User = require('../models/user.model')


module.exports.login = async(req, res = response) =>{
    

try {
    
    const {email} = req.body
    const user = await User.findOne({email})
    if(!user){
       return res.status(400).json(`Email or password is incorrect`)
    }


} catch (error) {
    res.status(500).json(`Opps ${error} ,try contacting the admin, the backend is burning!!!`)
}





    res.json({msg:'this route works'})
}