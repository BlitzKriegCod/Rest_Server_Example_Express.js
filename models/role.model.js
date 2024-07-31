const {Shema,model} = require('mongoose')
module.exports.role = new Shema({
    role:{
        type:String,
        required:[true,'A role is required']
    }
})