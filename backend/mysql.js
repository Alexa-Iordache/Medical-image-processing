const mysql = require("mysql");
let connection;

// createPool is a place where connections get stored.
// When you request a connection from a pool,you will 
// receive a connection that is not currently being used, 
// or a new connection. If you're already at the connection 
// limit, it will wait until a connection is available before it continues.
function connect (callback) {
    connection = mysql.createPool ( {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'clinica'
    });

    // getConnection = gets a connection from the pool
    connection.getConnection((error, variable) => {
        if (error) {
            callback(error, null);
        }
        else {
            callback(null, variable);
        }
    });

    // callback is a function which is called when a task is completed
    // it prevents any kind of blocking 
    // it allows other code to run in the meantime
}

// function which helps us to deal with query strings
// trimit query 
function query (query, callback) {
    connection.query (query, (error, result) => {
        if (error) {
            callback(error, null);
        }
        else {
            callback(null, result);
        }
    })
}

module.exports = { connect, query };