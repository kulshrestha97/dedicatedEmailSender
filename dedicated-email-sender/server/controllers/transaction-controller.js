const mongoose = require("mongoose");
const HttpError = require("../models/http-error");
const Transaction = require("../models/transaction");
const User = require("../models/user");

const getAll = async (req, res, next) => {
  const userid = req.body;
  let transactions;
  let userExists;
  try {
    userExists = await User.find({ userid: userid }, "userid");
  } catch (error) {
    next(new HttpError("Cannot perform the operation, try again later", 500));
  }
  if (userExists.length === 0) {
    next(
      new HttpError(
        "User doesn't exists, please provide valid credentials",
        500
      )
    );
    return;
  }
  try {
    transactions = await Transaction.find({ userid: userid });
  } catch (error) {
    next(new HttpError("Cannot perform the operation, try again later", 500));
  }
  if (transactions.length === 0) {
    res.json({ message: "No transactions till now!" }).status(200);
    return;
  } else {
    res.json({ transactions }).status(200);
  }
};

const getByDate = (req, res, next) => {};

const getBySubject = (req, res, next) => {};

const sendEmail = (req, res, next) => {};

exports.getAll = getAll;
exports.getByDate = getByDate;
exports.getBySubject = getBySubject;
exports.sendEmail = sendEmail;
