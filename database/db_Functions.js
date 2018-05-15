    const mysql = require("mysql");

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'usbw',
        database: 'studentenhuis'
    });

    connection.connect();

//Studentenhuis functions
exports.newStudentenhuis = function(name, address, userId) {//

    //POST
    //Create new studentenhuis with email adn adress gotten from the json body request
    connection.query("INSERT INTO studentenhuis (Naam, Adres, UserId) VALUES ('" + name + "', '" + address + "', " + userId + ")", (err, rows, fields) => {
        if(err) {
            console.log('Error: ' + err)
        }
        if(rows) {
            console.log('We got rows!');
            console.dir(rows)
        }
    });
};

exports.getStudentenhuis = function () {
    //GET
    //Get all Studentenhuizen
    connection.query("SELECT Naam, Adres FROM studentenhuis", (err, rows, fields) => {
        if(err) {
            console.log('Error: ' + err)
        }
        if(rows) {
            console.log('We got rows!');
            console.dir(rows)
        }
    });
};

exports.getStudentenhuisWithId = function (huisId) {
    //GET
    //Get studentenhuis from huisId
    connection.query("SELECT Naam, Adres FROM studentenhuis WHERE ID = " + huisId , (err, rows, fields) => {
        if(err) {
            console.log('Error: ' + err)
        }
        if(rows) {
            console.log('We got rows!');
            console.dir(rows)
        }
    });
};

exports.updateStudentenhuis = function (name, address, huisId, userId) {
    //PUT
    //Update studentenhuis from huisId
    connection.query("UPDATE studentenhuis SET Naam = '" + name + "', Adres = '" + address + "' WHERE ID = " + huisId + " AND UserId = " + userId, (err, rows, fields) => {
        if(err) {
            console.log('Error: ' + err)
        }
        if(rows) {
            console.log('We got rows!');
            console.dir(rows)
        }
    });
};

exports.deleteStudentenhuis = function (huisId, userId) {
    //DELETE
    //Delete studentenhuis from huisId
    connection.query("DELETE FROM studentenhuis WHERE ID = " + huisId + " AND UserId = " + userId, (err, rows, fields) => {
        if(err) {
            console.log('Error: ' + err)
        }
        if(rows) {
            console.log('We got rows!');
            console.dir(rows)
        }
    });
};