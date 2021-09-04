const mongoose = require("mongoose");
const url =
  "mongodb+srv://kulshrestha97:Password_123@cluster0.w9hnd.mongodb.net/emailTransactions?retryWrites=true&w=majority";
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const userRoutes = require("./routes/user-routes");
// const transactionRoutes = require("./routes/transaction-route");

app.use(bodyParser.json());

app.use("/api/user", userRoutes);
// app.use("/api/transactions", transactionRoutes);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    next(error);
  }
  res.status(error.code || 500);
  res.json(error.message || "Server Error");
});

mongoose
  .connect(url)
  .then(() => {
    app.listen(5000);
  })
  .catch((error) => {
    console.log(error);
  });
