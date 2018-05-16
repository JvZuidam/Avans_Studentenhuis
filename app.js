const app = new require("express")();
const config = require('./config.json');
const bodyParser = require('body-parser');

app.set('SECRET_KEY', config.secretkey);

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());


app.all("*", (req, res, next) => {
    console.log(req.url);
    next();
});

app.listen(process.env.PORT || 8088, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

app.use("/api", require("./routes/apiV1"));

app.get("*", (req, res) => {
    res.status(200);
    res.json("Hacker go away!");
});