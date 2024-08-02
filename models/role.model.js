const { Schema, model } = require("mongoose");
const Role = new Schema({
  role: {
    type: String,
    required: [true, "A role is required"]
  }
});

const role = new model("role", Role);
module.exports = role;
