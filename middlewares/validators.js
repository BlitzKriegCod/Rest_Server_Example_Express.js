const { check } = require("express-validator");
const userModel = require("../models/user.model");
const Role = require("../models/role.model");
const { validationResult } = require("express-validator");

module.exports.validateUserFields = (name, email, password, role) => {
  const validations = [
    check(name, "Name is required").not().isEmpty(),
    check(email, "Not is a valid syntax for an email address").isEmail(),
    check(password, "Min length allowed are 6 characters and is required").isLength({ min: 6 }).not().isEmpty(),
    check(role).custom(async (role) => {
      const requiredRole = await Role.findOne({ role });
      if (!requiredRole)
        throw new Error(`Role ${role} ,not found in the database`);
    })
  ];
  return validations;
};

module.exports.validateFields = async (req, res, next) => {
  const err = validationResult(req);

  const { email } = req.body;
  const toMatchEmail = await userModel.findOne({ email });
  if (!err.isEmpty()) {
    res.status(400).json(err);
  } else if (toMatchEmail) {
    res.status(400).json({ msg: "Email already exists" });
  } else {
    next();
  }
};
module.exports.verifyRole = async function (role) {
  const isRoleVerify = await Role.findOne({ role });
  if (!isRoleVerify) throw new Error(`${role} not found in the database`);
};

module.exports.verifyIdUser = async (id) => {
  const isRegistredUser = await userModel.findById(id);

  if (!isRegistredUser) throw new Error(`Id: ${id} are not registred`);
};

