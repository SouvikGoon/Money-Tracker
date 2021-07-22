const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Transaction = require("../models/Transaction");
const verifyToken = require("./verifyToken");

/*---------------------------------Getting Transactions----------------------------------------------*/

//route for getting transactions
router.get("/", verifyToken, async (req, res) => {
  try {
    const data = await Transaction.find({ userId: req.user.user_id });
    res.status(200).json({ success: true, data: data });
  } catch (err) {
    res.json(err);
  }
});

/*---------------------------------Adding a Transaction----------------------------------------------*/

//route for adding transaction
router.post("/", verifyToken, async (req, res) => {
  const newTransaction = new Transaction({
    detail: req.body.detail,
    amount: req.body.amount,
    type: req.body.type,
    userId: req.user.user_id,
  });

  try {
    const addedTransaction = await newTransaction.save();
    res.status(201).json(addedTransaction);
  } catch (err) {
    res.json(err);
  }
});

/*---------------------------------Deleting a Transaction----------------------------------------------*/

//route for deleting transaction
router.delete("/:id", verifyToken, async (req, res) => {
  const idToDelete = req.params.id;

  try {
    const deletedTransaction = await Transaction.deleteOne({ _id: idToDelete });
    res.json(deletedTransaction);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
