const { request } = require("express");
const User = require("../models/user.model");
const DB = require("../database/config");
const { save } = require("mongoose");
const CryptPassword = require("../helpers/bcrypt");

const {validateEmail}  = require("../middlewares/validators");

const getUsers = (req, res) => {
  const { a } = req.query;
  res.json({ a });
};
const postUsers = async function (req, res) {
 
  const { name, role, email, password } = req.body;
 
 

    const u = new User({
      name,
      role,
      email,
      password: CryptPassword(password)
    });
    await u.save();

    res.json(u);
  
};
module.exports = {
  getUsers,
  postUsers
};
