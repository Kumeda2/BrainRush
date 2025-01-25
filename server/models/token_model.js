const { Schema, model } = require("mongoose");

const TokenSchema = new Schema({
  refreshToken: { type: String, unique: true },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = model("Token", TokenSchema);
