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

//Routes for Studentenhuis
router.post("/studentenhuis", (request, result) => {
    console.log(request.body.name);
    console.log(request.body.adres);
    console.log(request.body.id);
    db.newStudentenhuis(request.body.name, request.body.adres, request.body.id, (rows) => {
        db.getStudentenhuisWithId(rows.insertId, (rows) => {
            result.status(200);
            result.json(rows);
        })
    });
    //TODO: 401 non authorized message
    //TODO: 412 The server does not meet one of the preconditions that the requester put on the request
});

router.get("/studentenhuis", (request, result) => {
    db.getStudentenhuis((rows) => {
        result.status(200);
        result.json(rows);
    });
    //TODO: 401 non authorized message
});

router.get("/studentenhuis/:huisId?", (request, result) => {
    console.log(request.params.huisId);
    db.getStudentenhuisWithId(request.params.huisId, (rows) => {
        result.status(200);
        result.json(rows);
    });
    //TODO: 401 non authorized message
    //TODO: 404 The requested resource could not be found but may be available in the future. Subsequent requests by the client are permissible.
});

router.put("/studentenhuis/:huisId?", (request, result) => {
    console.log(request.body.name);
    console.log(request.body.adres);
    console.log(request.params.huisId);
    db.updateStudentenhuis(request.body.name, request.body.adres, request.params.huisId, (rows) => {
       result.status(200);
       result.json(rows);
    });
    //TODO: 401 non authorized message
    //TODO: 404 The requested resource could not be found but may be available in the future. Subsequent requests by the client are permissible.
    //TODO; 409 Indicates that the request could not be processed because of conflict in the request, such as an edit conflict between multiple simultaneous updates.
    //TODO: 412 The server does not meet one of the preconditions that the requester put on the request
});

router.delete("/studentenhuis/:huisId?", (request, result) => {
    console.log(request.params.huisId);
    db.deleteStudentenhuis(request.params.huisId, (rows) => {
        result.status(200);
        result.json(rows);
    });
    //TODO: 401 non authorized message
    //TODO: 404 The requested resource could not be found but may be available in the future. Subsequent requests by the client are permissible.
    //TODO; 409 Indicates that the request could not be processed because of conflict in the request, such as an edit conflict between multiple simultaneous updates.
    //TODO: 412 The server does not meet one of the preconditions that the requester put on the request

});

//Routes for Maaltijd
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

//Routes for Deelnemer
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
