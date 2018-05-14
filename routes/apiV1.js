const express = require("express");

const router = express.Router();

router.get("/hello", (request, result) => {
    result.json("Hello World!");
});

router.get("/goodnight", (request, result) => {
    result.json("Goodnight World!");
});

//Routes for Meals
router.post("/studentenhuis/:huisId?/maaltijd", (request, result) => {
    const huisId = request.params.huisId;
    result.json(huisId);
});

router.get("/studentenhuis/:huisId?/maaltijd", (request, result) => {
    const huisId = request.params.huisId;
    result.json(huisId);
});

router.get("/studentenhuis/:huisId?/maaltijd/:maaltijdId?", (request, result) => {
    const huisId = request.params.huisId;
    const maaltijdId = request.params.maaltijdId;
    result.json(huisId);
    result.json(maaltijdId);
});

router.put("/studentenhuis/:huisId?/maaltijd/:maaltijdId?", (request, result) => {
    const huisId = request.params.huisId;
    const maaltijdId = request.params.maaltijdId;
    result.json(huisId);
    result.json(maaltijdId);
});

router.delete("/studentenhuis/:huisId?/maaltijd/:maaltijdId?", (request, result) => {
    const huisId = request.params.huisId;
    const maaltijdId = request.params.maaltijdId;
    result.json(huisId);
    result.json(maaltijdId);
});

module.exports = router;