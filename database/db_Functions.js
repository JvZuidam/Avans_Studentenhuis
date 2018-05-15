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

//Maaltijd functions
exports.newMaaltijd = function (name, description, ingredients, allergies, costs, userId, studentenhuisId, callback) {
    //POST
    //Create new Maaltijd
    connection.query("INSERT INTO maaltijd (Allergie, Beschrijving, Ingredienten, Naam, Prijs, StudentenhuisID, UserID) VALUES ('" + allergies + "', '" + description + "', '" + ingredients + "', '" + name + "', '" + costs + "', " + studentenhuisId + ", " + userId  + ")", (err, rows, fields) => {
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

exports.getAllMaaltijden = function (userId, studentenhuisId, callback) {
    //GET
    //Get all maaltijden from studentenhuisId
    connection.query("SELECT * FROM maaltijd WHERE StudentenhuisID = " + studentenhuisId + " AND UserID =  " + userId, (err, rows, fields) => {
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


exports.getMaaltijd = function (userId, studentenhuisId, maaltijdId, callback) {
    //GET
    //Get maaltijden from studentenhuisId & maaltijdId
    connection.query("SELECT * FROM maaltijd WHERE ID = " + maaltijdId + " AND  StudentenhuisID = " + studentenhuisId + " AND UserID =  " + userId, (err, rows, fields) => {
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

exports.updateMaaltijd = function (name, description, ingredients, allergies, costs, userId, studentenhuisId, maaltijdId, callback) {
    //PUT
    //Update the maaltijden from studentenhuisId & maaltijdId
    connection.query("UPDATE maaltijd SET Allergie = '" + allergies + "', Beschrijving = '" + description + "', Ingredienten = '" + ingredients + "', Naam = '" + name + "', Prijs = '" + costs + "' WHERE ID = " + maaltijdId + " AND StudentenhuisID = " + studentenhuisId + " AND UserID =  " + userId, (err, rows, fields) => {
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

exports.deleteMaaltijd = function (userId, studentenhuisId, maaltijdId, callback) {
    //DELETE
    //DELETE the maaltijden from studentenhuisId & maaltijdId
    connection.query("DELETE FROM maaltijd WHERE ID = " + maaltijdId + " AND StudentenhuisID = " + studentenhuisId + " AND UserId = " + userId, (err, rows, fields) => {
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