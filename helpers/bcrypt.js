const bcrypt =require('bcrypt');


const salt = bcrypt.genSaltSync()


function CryptPassword(password) {
   
    const Hash_Password =bcrypt.hashSync(password , salt) 
      return Hash_Password
        
}
module.exports = CryptPassword