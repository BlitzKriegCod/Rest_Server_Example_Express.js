const { model, Schema } = require("mongoose");

const UserSchema = new Schema({
  name: {
    type: String,
    requied: [true, "Name is required"]
  },
  google: { type: Boolean, default: false },
  email: {
    type: String,
    requied: [true, "Email address is required"],
    unique: true
  },
  status: { type: Boolean, default: true },
  img: {
    default: "",
    type: String
  },
  role: {
    type: String,
    requied: true
  },
  password: {
    type: String,
    requied: [true, "Password is required"]
  }
});
UserSchema.methods.toJSON = function () {
  const { __v, password, _id,...user } = this.toObject();
  user.uid = _id
  return user;
};

module.exports = model("User", UserSchema, "users");
