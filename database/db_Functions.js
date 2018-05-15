const mysql = require("mysql");

const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'usbw',
        database: 'studentenhuis'
});

    connection.connect();

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

exports.getStudentenhuis = function (callback) {
    //GET
    //Get all Studentenhuizen
    connection.query("SELECT * FROM studentenhuis", (err, rows, fields) => {
        if(err) {
            console.log('Error: ' + err)
        }
        if(rows) {
            console.log('We got rows!');
            console.dir(rows)
            callback(rows);
        }
    });
};

exports.getStudentenhuisWithId = function (huisId, callback) {
    //GET
    //Get studentenhuis from huisId
    connection.query("SELECT * FROM studentenhuis WHERE ID = " + huisId, (err, rows, fields) => {
        if(err) {
            console.log('Error: ' + err)
        }
        if(rows) {
            console.log('We got rows!');
            console.dir(rows);
            callback(rows);
        }
    });
};

exports.updateStudentenhuis = function (name, address, huisId, callback) {
    //PUT
    //Update studentenhuis from huisId
    connection.query("UPDATE studentenhuis SET Naam = '" + name + "', Adres = '" + address + "' WHERE ID = " + huisId + " AND UserId = " + userId, (err, rows, fields) => {
        if(err) {
            console.log('Error: ' + err)
        }
        if(rows) {
            console.log('We got rows!');
            console.dir(rows);
            callback(rows);
        }
    });
};

exports.deleteStudentenhuis = function (huisId, userId, callback) {
    //DELETE
    //Delete studentenhuis from huisId
    connection.query("DELETE FROM studentenhuis WHERE ID = " + huisId + " AND UserId = " + userId, (err, rows, fields) => {
        if(err) {
            console.log('Error: ' + err)
        }
        if(rows) {
            console.log('We got rows!');
            console.dir(rows);
            callback(rows);
        }
    });
};