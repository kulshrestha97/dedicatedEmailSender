const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const transaction = new Schema({
  userid: { type: String, required: true },
  subject: { type: String, required: true },
  time: { type: Date, required: true },
  transactionid: { type: String, required: true },
});

module.exports = mongoose.model("Transaction", transaction);
