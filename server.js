const express = require("express");
const app = express();
const path = require("path");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoute = require("./routes/auth");
const transactionsRoute = require("./routes/transactions");

dotenv.config();

//connect with db
mongoose.connect(
  process.env.CONNECT_DB,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => console.log("Connected to database! error ->", err)
);

//middleware
app.use(cors());
app.use(express.json());

//routes middleware
app.use("/api/user", authRoute);
app.use("/api/transactions", transactionsRoute);

//if running in production, serve index page
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// } else {
//   app.get("/", (req, res) => {
//     res.send("Api Running.");
//   });
// }

app.get("/", (req, res) => {
  res.send("Api Running.");
});

//start listening
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}.`));
