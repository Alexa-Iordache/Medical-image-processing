const { exec, spawn } = require('node:child_process');
const { stderr } = require('node:process');

exec ('python3 script1.py', (error, stdout, stderr) => {
    console.log('error' + error);
    console.log('stdout' + stdout);
    console.log('stderr' + stderr);
}) 