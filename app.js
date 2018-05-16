const app = new require("express");
const AuthController = require("./controllers/authentication.controller.js");
const unAuth = require("./routes/unAuth.js");
const Auth = require("./routes/apiV1.js");

app.use("/app", unAuth);

app.all("*", AuthController.validateToken);

app.use("/app", Auth);

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