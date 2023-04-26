// const jwt = require("jsonwebtoken");
const { exec, spawn } = require("node:child_process");
const { stderr } = require("node:process");

let segmentation = {
  imageSegmentation(req, res, next) {
    console.log("text");

    exec("python3 src/handlers/script2.py", (error, stdout, stderr) => {
      console.log("error: " + error);
      console.log("stdout: " + stdout);
      console.log("stderr: " + stderr);
      if (error == null) {
        res.json({ id: 1, error: null, result: stdout });
      }
    });
  },
};

module.exports = segmentation;