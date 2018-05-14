const express = require("express");

const router = express.Router();

router.get("/hello", (request, result) => {
    result.json("Hello World!");
});

router.get("/goodnight", (request, result) => {
    result.json("Goodnight World!");
});

router.get("/login", (request, result) => {
    result.json("Login");
});

router.post("/register", (request, result) => {
    result.json("Register");
});
module.exports = router;