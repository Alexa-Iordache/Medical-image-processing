const express = require("express");
const mysql = require("./mysql.js");
const cors = require("cors");
const router = require("./api.js");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", router);

app.listen(4201, () => {
  console.log("merge portul");

  mysql.connect((error, result) => {
    if (error) {
      throw error;
    } else {
      console.log("conectat la baza de date");
    }
  });
});
