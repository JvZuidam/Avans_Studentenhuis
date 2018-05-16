const mysql = require("mysql");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'usbw',
    database: 'studentenhuis'
});

connection.connect();

//Auth functions
exports.Login = function(email, password, callback) {
    //POST
    //login the user
    connection.query(" SELECT * FROM user WHERE email = " + email + " AND password = " + password, (err, rows, fields) => {
        if(err) {
            console.log('Error: ' + err);
            callback(err);
        }
        if(rows) {
            console.log('We got rows!');
            console.dir(rows);
            callback(rows);
        }
    });
};

exports.Register = function(firstname, lastname, email, password) {
    //POST
    //Register the user
    connection.query("INSERT INTO user (Voornaam, Achternaam, Email, Password) VALUES (" + firstname + ", " + lastname + ", " + email + ", " + password + ")", (err, rows, fields) => {
        if(err) {
            console.log('Error: ' + err);
        }
        if(rows) {
            console.log('We got rows!');
            console.dir(rows);
        }
    });
};