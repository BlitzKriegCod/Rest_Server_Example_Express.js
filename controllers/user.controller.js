const User = require("../models/user.model");
const DB = require("../database/config");

const CryptPassword = require("../helpers/bcrypt");
const userModel = require("../models/user.model");

const getUsers = async (req, res) => {
  const { limit = 10, from = 0 } = req.query;

  const l = Number(limit);
  const f = Number(from);
  if (l.toString() === "NaN" || f.toString() === "NaN") {
    res
      .status(400)
      .json({ Query_Params: { limit, from }, msg: "must be numbers" });
  } else {
    const data = await User.find().skip(f).limit(l);
    const total = await User.countDocuments();
    res.json({ data, total });
  }
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
const putUser = async (req, res) => {
  const { id } = req.params;
  const { _id, password, google, email, ...user } = req.body;

  if (password) {
    user.password = CryptPassword(password);
  }

  const u = await User.findByIdAndUpdate(id, user);

  res.json({ id, u });
};

const deleteUser= async(req, res) => {
  const { id } = req.params
 const  u = await User.findByIdAndDelete(id)
  res.status(200).json({msg:'User delete',u})  
}
module.exports = {
  getUsers,
  postUsers,
  putUser,deleteUser
};