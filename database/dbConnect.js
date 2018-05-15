const mysql = require("mysql");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'usbw',
    database: 'studentenhuis'
});

connection.connect();

connection.query('SELECT * from studentenhuis', (err, rows, fields) => {
    if(err) {
        console.log('Error: ' + err)
    }
    if(rows) {
        console.log('We got rows!');
        console.dir(rows)
    }
});