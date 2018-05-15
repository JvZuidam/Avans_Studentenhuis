const mysql = require("mysql");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'usbw',
    database: 'studentenhuis'
});

connection.connect();

//Auth functions
exports.Login = function(email, password) {
    //POST
    //login the user
    connection.query(" SELECT * FROM user WHERE email = " + email + " AND password = " + password, (err, rows, fields) => {
        if(err) {
            console.log('Error: ' + err)
        }
        if(rows) {
            console.log('We got rows!');
            console.dir(rows)
        }
    });
};

exports.Register = function(firstname, lastname, email, password) {
    //POST
    //Register the user
    connection.query("INSERT INTO user (Voornaam, Achternaam, Email, Password) VALUES (" + firstname + ", " + lastname + ", " + email + ", " + password + ")", (err, rows, fields) => {
        if(err) {
            console.log('Error: ' + err)
        }
        if(rows) {
            console.log('We got rows!');
            console.dir(rows)
        }
    });
};

//Studentenhuis functions
exports.newStudentenhuis = function(name, address, userId, callback) {//

    //POST
    //Create new studentenhuis with email adn adress gotten from the json body request
    connection.query("INSERT INTO studentenhuis (Naam, Adres, UserId) VALUES ('" + name + "', '" + address + "', " + userId + ")", (err, rows, fields) => {
        if(err) {
            console.log('Error: ' + err)
        }
        if(rows) {
            console.log('We got rows!');
            console.log(rows);
            console.log(rows.insertId);
            callback(rows);
        }
    });
};

//Deelnemer functions
exports.newDeelnemer = function (maaltijdId, studentenhuisId, userId, callback) {
    //POST
    //Add new deelnemer to maaltijd from Studentenhuis & maaltijd
    connection.query("INSERT INTO deelnemers (MaaltijdID, StudentenhuisID, UserID) values (" + maaltijdId + ", " + studentenhuisId + ", " + userId + ")", (err, rows, fields) => {
        if(err) {
            console.log('Error: ' + err)
        }
        if(rows) {
            console.log('We got rows!');
            console.log(rows);
            console.log(rows.insertId);
            callback(rows);
        }
    });
};

exports.getDeelnemer = function (maaltijdId, studentenhuisId, callback) {
    //GET
    //Get deelnemer from maaltijd from Studentenhuis & maaltijd
    connection.query("SELECT * FROM deelnemers WHERE StudentenhuisID = " + studentenhuisId + " AND MaaltijdID = " + maaltijdId, (err, rows, fields) => {
        if(err) {
            console.log('Error: ' + err)
        }
        if(rows) {
            console.log('We got rows!');
            console.log(rows);
            console.log(rows.insertId);
            callback(rows);
        }
    });
};

exports.deleteDeelnemer = function (maaltijdId, studentenhuisId, userId, callback) {
    //DELETE
    //Delete deelnemer from maaltijd from Studentenhuis & maaltijd
    connection.query("DELETE FROM deelnemers WHERE StudentenhuisID = " + studentenhuisId + " AND MaaltijdID = " + maaltijdId + " AND UserID = " + userId, (err, rows, fields) => {
        if(err) {
            console.log('Error: ' + err)
        }
        if(rows) {
            console.log('We got rows!');
            console.log(rows);
            console.log(rows.insertId);
            callback(rows);
        }
    });
};