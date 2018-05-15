const app = new require("express")();

app.use("/unAuth", require("./routes/unAuth.js"));

app.all("*", AuthController.validateToken);

app.use("/apiV1", require("./routes/apiV1.js"));

app.get("*", (req, res) => {
    res.status(200);
    res.json("Hacker go away!");
});

const port = 8088;
app.listen(port, () => {
    console.log("The magic happens at port " + port);
});