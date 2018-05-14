const express = require("express");

const router = express.Router();

router.get("/hello", (request, result) => {
    result.json("Hello World!");
});

module.exports = router;