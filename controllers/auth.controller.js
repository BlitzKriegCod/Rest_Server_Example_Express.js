const { response } = require("express");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { generateJWT } = require("../helpers/generate-jwt");
const {googleVerify} =require("../helpers/google-verify")

module.exports.login = async (req, res = response) => {
let token;
  try {
    const { email,password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json(`Email or password is incorrect`);
    } else if (user.status && bcrypt.compareSync(password, user.password)) {
      res.status(400).json(`User is online`);
    } else if (!user.status && bcrypt.compareSync(password, user.password)) {
      token = await generateJWT(user.id)
      await User.findOneAndUpdate({ email }, { status: true });
      res.json({msg:"User is online now",user,token});
    } else {
      res.status(400).json(`Email or password is incorrect`);
    }
  } catch (error) {
     res.status(500).json(`Oops,${error} try contacting the admin`);
  }
};
module.exports.googleSignin = async( req,res) => {

  const { id_token } = req.body;
    
  try {
      const { email, name, img } = await googleVerify( id_token );

      let user = await User.findOne({ email });

      if ( !user ) {
          
          const data = {
              name,
              email,
              password: ':P',
              img,
              google: true
          };

          user = new Usuario( data );
          await user.save();
      }

      
      if ( !user.status ) {
          return res.status(401).json({
              msg: 'User already exist'
          });
        }

      
      const token = await generateJWT( user.id );
      
      res.json({
          user,
          token
      });
      
  } catch (error) {

      res.status(400).json({
          msg: 'Token invalid'
      })

  }


}