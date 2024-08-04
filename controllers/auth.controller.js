const { response } = require("express")

module.exports.login = (req, res = response) =>{
    
    res.json({msg:'this route works'})
}