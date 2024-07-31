const { model, Schema } = require("mongoose");

const UserShema = new Schema({
  name: {
    type: String,
    requied: [true, "Name is required"]
  },
  google: {type:Boolean,
        default:false
  },
  email: {
    type: String,
    requied: [true, "Email address is required"],
    unique: true
  },
  status: {type:Boolean,
    default:true
  },
  img: {
    default:'',
    type: String
  },
  role: {
    type: String,
    requied: true,
    enum: ["ADMIN_ROLE", "USER_ROLE"]
  },
  password: {
    type: String,
    requied: [true, "Password is required"]
  }
});

module.exports = model("User", UserShema,'users');
