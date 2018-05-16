const server = new require("express")();


server.get("*", (req, res, next) => {
    console.log(req.url);
    next();
});

// app.get("/api/hello", (req, res) => {
//     res.status(200);
//     res.json("Hello World!");
// });

server.use("/api", require("./routes/apiV1"));

server.get("*", (req, res) => {
    res.status(200);
    res.json("Hacker go away!");
});


const port = 8088;
server.listen(port, () => {
    console.log("The magic happens at port " + port);
});