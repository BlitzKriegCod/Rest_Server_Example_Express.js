const bcrypt =require('bcrypt');


const salt = bcrypt.genSaltSync()


function CryptPassword(password) {
    const hashpassword =bcrypt.hashSync(password , salt) 
      return hashpassword
        
}
module.exports = CryptPassword