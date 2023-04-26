const { exec, spawn } = require('node:child_process');
const { stderr } = require('node:process');

exec ('python3 script2.py', (error, stdout, stderr) => {
    console.log('error: ' + error);
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
}) 

// const matlab = require('matlab-engine');

// // Start the MATLAB engine
// (async function () {
//   await matlab.extrinsic('your_matlab_file.m');
//   const output = await matlab.your_matlab_function();
//   console.log(output);
// }());
