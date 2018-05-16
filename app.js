const app = new require("express")();


app.get("*", (req, res, next) => {
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


const port = 8088;
app.listen(port, () => {
    console.log("The magic happens at port " + port);
});