const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  detail: {
    type: String,
    required: [true, "Detail Missing!"],
  },
  amount: {
    type: Number,
    required: [true, "Amount Missing!"],
  },
  type: {
    type: String,
    required: [true, "Transaction type missing!"],
    enum: ["expense", "income"],
  },
  userId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Transaction", transactionSchema);
