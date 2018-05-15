const express = require("express");
const db = require("../database/db_Functions");
const bodyParser = require('body-parser');
const router = express.Router();

router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/hello", (request, result) => {
    result.json("Hello World!");
});

router.get("/goodnight", (request, result) => {
    result.json("Goodnight World!");
});
//Routes for Deelnemers
router.post("/studentenhuis/:huisId?/maaltijd/:maaltijdId?/deelnemers", (request, result) => {
    const huisId = request.params.huisId;
    const maaltijdId = request.params.maaltijdId;
    db.newDeelnemer(maaltijdId, huisId, 1, (rows) => {
       result.status(200);
       result.json(rows);
    });
    //TODO: 401 non authorized message
    //TODO: 404 The requested resource could not be found but may be available in the future. Subsequent requests by the client are permissible.
    //TODO; 409 Indicates that the request could not be processed because of conflict in the request, such as an edit conflict between multiple simultaneous updates.

});

router.get("/studentenhuis/:huisId?/maaltijd/:maaltijdId?/deelnemers", (request, result) => {
    const huisId = request.params.huisId;
    const maaltijdId = request.params.maaltijdId;
    db.getDeelnemer(maaltijdId, huisId, (rows) => {
        result.status(200);
        result.json(rows);
    });
    //TODO: 401 non authorized message
    //TODO: 404 The requested resource could not be found but may be available in the future. Subsequent requests by the client are permissible.

});

router.delete("/studentenhuis/:huisId?/maaltijd/:maaltijdId?/deelnemers", (request, result) => {
    const huisId = request.params.huisId;
    const maaltijdId = request.params.maaltijdId;
    db.deleteDeelnemer(maaltijdId, huisId, 1, (rows) => {
        result.status(200);
        result.json(rows);
    });
    //TODO: 401 non authorized message
    //TODO: 404 The requested resource could not be found but may be available in the future. Subsequent requests by the client are permissible.
    //TODO; 409 Indicates that the request could not be processed because of conflict in the request, such as an edit conflict between multiple simultaneous updates.

});

module.exports = router;