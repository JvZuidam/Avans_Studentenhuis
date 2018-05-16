const app = new require("express")();


app.get("*", (req, res, next) => {
    console.log(req.url);
    next();
});

// app.get("/api/hello", (req, res) => {
//     res.status(200);
//     res.json("Hello World!");
// });

app.use("/api", require("./routes/apiV1"));

app.get("*", (req, res) => {
    res.status(200);
    res.json("Hacker go away!");
});


const port = 8080;
app.listen(port, () => {
    console.log("The magic happens at port " + port);
});