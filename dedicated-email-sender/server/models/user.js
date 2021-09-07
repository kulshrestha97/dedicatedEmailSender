const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  userid: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  transactionid: [{ type: String, required: true, ref: "Transaction" }],
});

module.exports = mongoose.model("User", userSchema);
