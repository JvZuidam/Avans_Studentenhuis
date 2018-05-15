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
