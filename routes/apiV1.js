const express = require("express");

const router = express.Router();

router.get("/hello", (request, result) => {
    result.json("Hello World!");
});

router.get("/goodnight", (request, result) => {
    result.json("Goodnight World!");
});

router.get("/studentenhuis", (request, result) => {
    result.json("Hello World!");
});

router.post("/studentenhuis", (request, result) => {
    result.json("Hello World!");
});

router.get("/studentenhuis/:huisId?", (request, result) => {
    const huisId = request.params.huisId;
    result.json(huisId);
});

router.put("/studentenhuis/:huisId?", (request, result) => {
    const huisId = request.params.huisId;
    result.json(huisId);
});

router.delete("/studentenhuis/:huisId?", (request, result) => {
    const huisId = request.params.huisId;
    result.json(huisId);
});

module.exports = router;
