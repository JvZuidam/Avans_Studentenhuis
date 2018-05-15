const app = new require("express")();
const AuthController = require('./controllers/authentication.controller')

app.use("/unAuth", require("./routes/unAuth.js"));

app.all("*", AuthController.validateToken);

app.use("/apiV1", require("./routes/apiV1.js"));

app.use('*', function (req, res, next) {
    const error = new ApiError("Deze endpoint bestaat niet", 404);
    console.log("Hacker go away!");
    next(error);
});

app.use((err, req, res, next) => {
    res.status((err.code || 404)).json(err).end();
});

const port = 8088;
app.listen(port, () => {
    console.log("The magic happens at port " + port);
});