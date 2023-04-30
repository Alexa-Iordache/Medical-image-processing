const { exec, spawn } = require("node:child_process");
const { stderr } = require("node:process");

// [--imagePath IMAGEPATH] [--brightnessValue BRIGHTNESSVALUE] [--contrastValue CONTRASTVALUE]

let brightness = {
  brightnessEnhancement(req, res, next) {
    let imagepath = req.body.params.imagepath;
    let brightness = req.body.params.brightness;
    let contrast = req.body.params.contrast;
    let command = `python3 src/handlers/brightnessEnhCode.py --imagePath './src/processImages/${imagepath}' --brightnessValue ${brightness} --contrastValue ${contrast}`;

    exec(command, (error, stdout, stderr) => {
      console.log("error: " + error);
      console.log("stdout: " + stdout);
      console.log("stderr: " + stderr);
      if (error == null) {
        res.json({ id: 1, error: null, result: stdout });
      }
    });
  },
};

module.exports = brightness;
