const express = require("express");

const router = express.Router();

router.get("/login", (request, result) => {
    result.json("Login");
});

router.post("/register", (request, result) => {
    result.json("Register");
});

module.exports = router;