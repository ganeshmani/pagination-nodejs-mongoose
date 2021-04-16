const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const {
  fetchCompanies,
  fetchCompaniesCursor,
} = require("./controllers/tradesController");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({});
}

const PORT = process.env.PORT || 4500;
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(
  MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  },
  (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("MongoDB connected successfully");

      app.get("/", (req, res) => {
        res.send("Welcome");
      });

      app.get("/companies", fetchCompanies);

      app.get("/companies-cursor", fetchCompaniesCursor);
    }
  }
);

app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});
