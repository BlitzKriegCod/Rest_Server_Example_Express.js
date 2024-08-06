const { response } = require("express");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { generateJWT } = require("../helpers/generate-jwt");
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
    return res.status(500).json(`Oops,${error} try contacting the admin`);
  }
};
