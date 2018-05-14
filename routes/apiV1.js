const express = require("express");

const router = express.Router();

router.get("/hello", (request, result) => {
    result.json("Hello World!");
});

router.get("/goodnight", (request, result) => {
    result.json("Goodnight World!");
});

router.post("/studentenhuis/:huisId?/maaltijd/:maaltijdId?", (request, result) => {
    const huisId = request.params.huisId;
    const maaltijdId = request.params.maaltijdId;
    result.json(huisId + ", " + maaltijdId);
});

router.get("/studentenhuis/:huisId?/maaltijd/:maaltijdId?/deelnemers", (request, result) => {
    const huisId = request.params.huisId;
    const maaltijdId = request.params.maaltijdId;
    result.json(huisId + ", " + maaltijdId);
});

router.delete("/studentenhuis/:huisId?/maaltijd/:maaltijdId?/deelnemers", (request, result) => {
    const huisId = request.params.huisId;
    const maaltijdId = request.params.maaltijdId;
    result.json(huisId + ", " + maaltijdId);
});

module.exports = router;