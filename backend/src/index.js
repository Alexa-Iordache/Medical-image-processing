const express = require("express");
const mysql = require("./mysql.js");
const cors = require("cors");
const router = require("./api.js");
const { exec, spawn } = require("node:child_process");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", router);

app.get("/script1", (req, res) => {
  exec("python3 src/script1.py", (error, stdout, stderr) => {
    console.log("error" + error);
    console.log("stdout" + stdout);
    console.log("stderr" + stderr);
    res.json({ id: 1, error: error, result: stdout });
  });
});

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

// // Function callName() is executed whenever
// // url is of the form localhost:3000/name
// function callName(req, res) {
//   // Use child_process.spawn method from
//   // child_process module and assign it
//   // to variable spawn
//   var spawn = require("child_process").spawn;

//   // Parameters passed in spawn -
//   // 1. type_of_script
//   // 2. list containing Path of the script
//   // and arguments for the script

//   // E.g : http://localhost:3000/name?firstname=Mike&lastname=Will
//   // so, first name = Mike and last name = Will
//   var process = spawn("python", [
//     "./handlers/index.py",
//     req.query.firstname,
//     req.query.lastname,
//   ]);

//   // Takes stdout data from script which executed
//   // with arguments and send this data to res object
//   process.stdout.on("data", function (data) {
//     res.send(data.toString());
//   });
// }
