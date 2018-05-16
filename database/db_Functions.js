const mysql = require("mysql");

const connection = mysql.createConnection({
    host: '188.166.109.108',
    user: 'studentenhuis_user',
    password: 'secret',
    database: 'studentenhuis'
});

connection.connect();

//Auth functions
exports.Login = function(email, password, callback) {
    //POST
    //login the user
    connection.query(" SELECT * FROM user WHERE email = " + email + " AND password = " + password, (err, rows, fields) => {
        if(err) {
            console.log('Error: ' + err)
            callback(err)
        }
        if(rows) {
            console.log('We got rows!');
            console.dir(rows)
            callback(rows)
        }
    });
};

exports.Register = function(firstname, lastname, email, password, callback) {
    //POST
    //Register the user
    connection.query("INSERT INTO user (Voornaam, Achternaam, Email, Password) VALUES (" + firstname + ", " + lastname + ", " + email + ", " + password + ")", (err, rows, fields) => {
        if(err) {
            console.log('Error: ' + err)
            callback(err)
        }
        if(rows) {
            console.log('We got rows!');
            console.dir(rows)
            callback(rows)
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
            callback(err)
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
            callback(err)
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
            callback(err)
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
            callback(err)
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
            callback(err)
        }
        if(rows) {
            console.log('We got rows!');
            console.dir(rows);
            callback(rows);
        }
    });
};
exports.newMaaltijd = function (name, description, ingredients, allergies, costs, userId, studentenhuisId, callback) {
    //POST
    //Create new Maaltijd
    connection.query("INSERT INTO maaltijd (Allergie, Beschrijving, Ingredienten, Naam, Prijs, StudentenhuisID, UserID) VALUES ('" + allergies + "', '" + description + "', '" + ingredients + "', '" + name + "', '" + costs + "', " + studentenhuisId + ", " + userId  + ")", (err, rows, fields) => {
        if(err) {
            console.log('Error: ' + err)
            callback(err)
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
            callback(err)
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
            callback(err)
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
            callback(err)
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
            callback(err)
        }
        if(rows) {
            console.log('We got rows!');
            console.dir(rows);
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
            callback(err)
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
            callback(err)
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
            callback(err)
        }
        if(rows) {
            console.log('We got rows!');
            console.log(rows);
            console.log(rows.insertId);
            callback(rows);
        }
    });
};
//Maaltijd functions