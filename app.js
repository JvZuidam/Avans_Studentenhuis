const app = new require("express")();
const mysql = require("mysql");

app.get("*", (req, res, next) => {
    console.log(req.url);
    next();
});

// app.get("/api/hello", (req, res) => {
//     res.status(200);
//     res.json("Hello World!");
// });

app.use("/apiV1", require("./routes/apiV1"));

app.get("*", (req, res) => {
    res.status(200);
    res.json("Hacker go away!");
});


const port = 8088;
app.listen(port, () => {
    console.log("The magic happens at port " + port);
});

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'usbw',
    database: 'studentenhuis'
})

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