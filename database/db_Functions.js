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
exports.newStudentenhuis = function(name, address, userId) {//
    //POST
    //Create new studentenhuis with email adn adress gotten from the json body request
    connection.query("INSERT INTO studentenhuis (Naam, Adres, UserId) VALUES (" + name+ ", " + address + ", " + userId + ")", (err, rows, fields) => {
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

        }
    });
};

exports.getStudentenhuis = function (huisId) {
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
    connection.query("UPDATE studentenhuis SET Naam = " + name + ", Adres = " + address + " WHERE ID = " + huisId + " AND UserId = " + userId, (err, rows, fields) => {
        if(err) {
            console.log('Error: ' + err)
        }
        if(rows) {
            console.log('We got rows!');
            console.dir(rows)
        }
    });
};

exports.deleteStudentenhuis = function () {
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

//Maaltijd functions
exports.newMaaltijd = function (name, description, ingredients, allergies, costs, userId, studentenhuisId) {
    //POST
    //Create new Maaltijd
    connection.query("INSERT INTO maaltijd (Allergie, Beschrijving, Ingredienten, Naam, Prijs, StudentenhuisID, UserID) VALUES (" + allergies + ", " + description + ", " + ingredients + ", " + name + ", " + costs + ", " + studentenhuisId + ", " + userId  + ")", (err, rows, fields) => {
        if(err) {
            console.log('Error: ' + err)
        }
        if(rows) {
            console.log('We got rows!');
            console.dir(rows)
        }
    });
};

exports.getAllMaaltijden = function (userId, studentenhuisId) {
    //GET
    //Get all maaltijden from studentenhuisId
    connection.query("SELECT * FROM maaltijd WHERE StudentenhuisID = " + studentenhuisId + " AND UserID =  " + userId, (err, rows, fields) => {
        if(err) {
            console.log('Error: ' + err)
        }
        if(rows) {
            console.log('We got rows!');
            console.dir(rows)
        }
    });
};


exports.getMaaltijd = function (userId, studentenhuisId, maaltijdId) {
    //GET
    //Get maaltijden from studentenhuisId & maaltijdId
    connection.query("SELECT * FROM maaltijd WHERE ID = " + maaltijdId + " AND  StudentenhuisID = " + studentenhuisId + " AND UserID =  " + userId, (err, rows, fields) => {
        if(err) {
            console.log('Error: ' + err)
        }
        if(rows) {
            console.log('We got rows!');
            console.dir(rows)
        }
    });
};

exports.updateMaaltijd = function (name, description, ingredients, allergies, costs, userId, studentenhuisId, maaltijdId) {
    //PUT
    //Update the maaltijden from studentenhuisId & maaltijdId
    connection.query("UPDATE studentenhuis SET Allergie = " + allergies + ", Beschrijving = " + description + ", Ingredienten = " + ingredients + ", Naam = " + name + ", Prijs = " + costs + "WHERE ID = " + maaltijdId + " AND  StudentenhuisID = " + studentenhuisId + " AND UserID =  " + userId, (err, rows, fields) => {
        if(err) {
            console.log('Error: ' + err)
        }
        if(rows) {
            console.log('We got rows!');
            console.dir(rows)
        }
    });
};

exports.deleteMaaltijd = function (userId, studentenhuisId, maaltijdId ) {
    //DELETE
    //DELETE the maaltijden from studentenhuisId & maaltijdId
    connection.query("DELETE FROM maaltijd WHERE ID = " + maaltijdId + " AND StudentenhuisID = " + studentenhuisId + " AND UserId = " + userId, (err, rows, fields) => {
        if(err) {
            console.log('Error: ' + err)
        }
        if(rows) {
            console.log('We got rows!');
            console.dir(rows)
        }
    });
};

//Deelnemer functions
exports.newDeelnemer = function (maaltijdId, studentenhuisId, userId) {
    //POST
    //Add new deelnemer to maaltijd from Studentenhuis & maaltijd
    connection.query("INSERT INTO deelnemer (MaaltijdID, StudentenhuisID, UserID) values (" + maaltijdId + ", " + studentenhuisId + ", " + userId + ")", (err, rows, fields) => {
        if(err) {
            console.log('Error: ' + err)
        }
        if(rows) {
            console.log('We got rows!');
            console.dir(rows)
        }
    });
};

exports.getDeelnemer = function (maaltijdId, studentenhuisId) {
    //GET
    //Get deelnemer from maaltijd from Studentenhuis & maaltijd
    connection.query("SELECT * FROM deelnemer WHERE StudentenhuidID = " + studentenhuisId + " AND MaaltijdID = " + maaltijdId, (err, rows, fields) => {
        if(err) {
            console.log('Error: ' + err)
        }
        if(rows) {
            console.log('We got rows!');
            console.dir(rows)
        }
    });
};

exports.deleteDeelnemer = function (maaltijdId, studentenhuisId, userId) {
    //DELETE
    //Delete deelnemer from maaltijd from Studentenhuis & maaltijd
    connection.query("DELETE FROM deelnemer WHERE StudentenhuidID = " + studentenhuisId + " AND MaaltijdID = " + maaltijdId + " AND UserID = " + userId, (err, rows, fields) => {
        if(err) {
            console.log('Error: ' + err)
        }
        if(rows) {
            console.log('We got rows!');
            console.dir(rows)
        }
    });
};