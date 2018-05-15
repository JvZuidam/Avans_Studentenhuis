const express = require("express");
const db = require("../database/db_Functions");


const router = express.Router();

router.get("/hello", (request, result) => {
    result.json("Hello World!");
});

router.get("/goodnight", (request, result) => {
    result.json("Goodnight World!");
});

router.get("/studentenhuis", (request, result) => {
    db.getStudentenhuis();
    result.json("Success");
});

router.post("/studentenhuis", (request, result) => {
    db.newStudentenhuis("test", "test1", 1)
    result.json("Success");
});

router.get("/studentenhuis/:huisId?", (request, result) => {
    const huisId = request.params.huisId;
    db.getStudentenhuisWithId(huisId);
    result.json(huisId);
});

router.put("/studentenhuis/:huisId?", (request, result) => {
    const huisId = request.params.huisId;
    db.updateStudentenhuis("testing", "testing1", 6, 1);
    result.json(huisId);
});

router.delete("/studentenhuis/:huisId?", (request, result) => {
    const huisId = request.params.huisId;
    db.deleteStudentenhuis(6, 1)
    result.json(huisId);
});

module.exports = router;
