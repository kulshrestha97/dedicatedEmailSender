const mongoose = require("mongoose");
const User = require("../models/user");
const HttpError = require("../models/http-error");

const signup = async (req, res, next) => {
  const { name, userid, password } = req.body;
  const userObject = new User({
    name,
    userid,
    password,
  });
  let userIdExists;
  try {
    userIdExists = await User.find({ userid: userid });
  } catch (error) {
    next(new HttpError(error, 500));
    return;
  }
  if (userIdExists.length === 0) {
    try {
      await userObject.save();
    } catch (error) {
      next(new HttpError(error, 500));
      return;
    }
    res.json({ message: "User Successfully Added!" }).status(201);
  } else {
    res.json({ message: "User already exists!" }).status(422);
  }
};

const login = async (req, res, next) => {
  const { userid, password } = req.body;
  let userExists;
  try {
    userExists = await User.find({ userid: userid });
    console.log(userExists);
  } catch (error) {
    next(new HttpError("Cannot perform the operation", 500));
    return;
  }
  if (userExists.length !== 0) {
    let passwordMatch =
      userExists.filter((user) => user.password === password).length === 0
        ? false
        : true;
    if (passwordMatch) {
      res.status(200).json({ message: "Logged In Successfully" });
      return;
    } else {
      next(new HttpError("Couldn't log in, credentials aren't valid", 401));
      return;
    }
  } else {
    next(new HttpError("Couldn't log in, credentials aren't valid", 401));
    return;
  }
};

const getUserProfile = async (req, res, next) => {
  const userid = req.params.id;
  let user;
  try {
    user = await User.find({ userid: userid });
  } catch (err) {
    next(new HttpError("Error finding user id, please try again", 500));
    return;
  }
  if (user.length != 0) {
    res.json({ user: user }).status(200);
    return;
  } else {
    res.json({ message: "User doesn't exist" }).status(404);
  }
};

exports.login = login;
exports.getUserProfile = getUserProfile;
exports.signup = signup;
