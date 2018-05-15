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

//Routes for Meals
router.post("/studentenhuis/:huisId?/maaltijd", (request, result) => {
    const huisId = request.params.huisId;
    db.newMaaltijd(request.body.naam, request.body.beschrijving, request.body.ingredienten, request.body.allergie, request.body.prijs, 1, huisId, (rows) => {
        db.getMaaltijd(1, huisId, rows.insertId, (rows) => {
            result.status(200);
            result.json(rows);
        })
    });
    //TODO: 401 non authorized message
    //TODO: 404 The requested resource could not be found but may be available in the future. Subsequent requests by the client are permissible.
    //TODO: 412 The server does not meet one of the preconditions that the requester put on the request

});

router.get("/studentenhuis/:huisId?/maaltijd", (request, result) => {
    const huisId = request.params.huisId;
    db.getAllMaaltijden(1, huisId, (rows) => {
        result.status(200);
        result.json(rows);
    });
    //TODO: 401 non authorized message
    //TODO: 404 The requested resource could not be found but may be available in the future. Subsequent requests by the client are permissible.

});

router.get("/studentenhuis/:huisId?/maaltijd/:maaltijdId?", (request, result) => {
    const huisId = request.params.huisId;
    const maaltijdId = request.params.maaltijdId;
    db.getMaaltijd(1, huisId, maaltijdId, (rows) => {
        result.status(200);
        result.json(rows);
    });
    //TODO: 401 non authorized message

});

router.put("/studentenhuis/:huisId?/maaltijd/:maaltijdId?", (request, result) => {
    const huisId = request.params.huisId;
    const maaltijdId = request.params.maaltijdId;
    db.updateMaaltijd(request.body.naam, request.body.beschrijving, request.body.ingredienten, request.body.allergie, request.body.prijs, 1, huisId, maaltijdId, (rows) => {
        result.status(200);
        result.json(rows);
    });
    //TODO: 401 non authorized message
    //TODO: 404 The requested resource could not be found but may be available in the future. Subsequent requests by the client are permissible.
    //TODO; 409 Indicates that the request could not be processed because of conflict in the request, such as an edit conflict between multiple simultaneous updates.
    //TODO: 412 The server does not meet one of the preconditions that the requester put on the request

});

router.delete("/studentenhuis/:huisId?/maaltijd/:maaltijdId?", (request, result) => {
    const huisId = request.params.huisId;
    const maaltijdId = request.params.maaltijdId;
    db.deleteMaaltijd(1, huisId, maaltijdId, (rows) => {
        result.status(200);
        result.json(rows);
    });
    //TODO: 401 non authorized message
    //TODO: 404 The requested resource could not be found but may be available in the future. Subsequent requests by the client are permissible.
    //TODO; 409 Indicates that the request could not be processed because of conflict in the request, such as an edit conflict between multiple simultaneous updates.

});

module.exports = router;