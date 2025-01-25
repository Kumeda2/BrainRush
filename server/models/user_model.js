const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  isActivated: { type: Boolean, default: false },
  activationLink: { type: String, unique: true },
});

module.exports = model("User", UserSchema);
