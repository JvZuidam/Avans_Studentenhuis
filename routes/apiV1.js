const express = require("express");
const moment = require("moment");
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
        if (rows) {
            result.status(200);
            result.json(rows);
        }  else {
            result.status(404).json({message: "Niet gevonden (huisId bestaat niet)", code: 404, datetime: moment().format("Y-mm-D:hh:mm:ss")});
        }
    });
    //TODO: 401 non authorized message
    //TODO; 409 Indicates that the request could not be processed because of conflict in the request, such as an edit conflict between multiple simultaneous updates.

});

router.get("/studentenhuis/:huisId?/maaltijd/:maaltijdId?/deelnemers", (request, result) => {
    const huisId = request.params.huisId;
    const maaltijdId = request.params.maaltijdId;
    db.getDeelnemer(maaltijdId, huisId, (rows) => {
        if (rows) {
            result.status(200);
            result.json(rows);
        }  else {
            result.status(404).json({message: "Niet gevonden (huisId bestaat niet)", code: 404, datetime: moment().format("Y-mm-D:hh:mm:ss")});
        }
    });
    //TODO: 401 non authorized message

});

router.delete("/studentenhuis/:huisId?/maaltijd/:maaltijdId?/deelnemers", (request, result) => {
    const huisId = request.params.huisId;
    const maaltijdId = request.params.maaltijdId;
    db.deleteDeelnemer(maaltijdId, huisId, 1, (rows) => {
        if (rows) {
            result.status(200);
            result.json(rows);
        }  else {
            result.status(404).json({message: "Niet gevonden (huisId bestaat niet)", code: 404, datetime: moment().format("Y-mm-D:hh:mm:ss")});
        }
    });
    //TODO: 401 non authorized message
    //TODO; 409 Indicates that the request could not be processed because of conflict in the request, such as an edit conflict between multiple simultaneous updates.

});

//Routes for Studentenhuis
router.post("/studentenhuis", (request, result) => {
    if(Object.keys(request.body).length === 0) {
        result.status(412).json({message: "Een of meer properties in de request body ontbreken of zijn foutief", code: 412, datetime: moment().format("Y-mm-D:hh:mm:ss")});
    } else if(!request.body.name.toString() === "" && !request.body.adres.toString() === "") {
        db.newStudentenhuis(request.body.name, request.body.adres, request.body.id, (rows) => {
            db.getStudentenhuisWithId(rows.insertId, (rows) => {
                result.status(200);
                result.json(rows);
            })
        });
    } else {
        result.status(412).json({message: "Een of meer properties in de request body ontbreken of zijn foutief", code: 412, datetime: moment().format("Y-mm-D:hh:mm:ss")});
    }
    //TODO: 401 non authorized message
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
        if (rows) {
            result.status(200);
            result.json(rows);
        }  else {
            result.status(404).json({message: "Niet gevonden (huisId bestaat niet)", code: 404, datetime: moment().format("Y-mm-D:hh:mm:ss")});
        }
    });
    //TODO: 401 non authorized message
});

router.put("/studentenhuis/:huisId?", (request, result) => {
    if(Object.keys(request.body).length === 0) {
        result.status(412).json({message: "Een of meer properties in de request body ontbreken of zijn foutief", code: 412, datetime: moment().format("Y-mm-D:hh:mm:ss")});
    } else if (!request.body.name.toString() === "" && !request.body.adres.toString() === "") {
        db.updateStudentenhuis(request.body.name, request.body.adres, request.params.huisId, (rows) => {
            if (rows) {
                result.status(200);
                result.json(rows);
            }  else {
                result.status(404).json({message: "Niet gevonden (huisId bestaat niet)", code: 404, datetime: moment().format("Y-mm-D:hh:mm:ss")});
            }
        });
    } else {
        result.status(412).json({message: "Een of meer properties in de request body ontbreken of zijn foutief", code: 412, datetime: moment().format("Y-mm-D:hh:mm:ss")});
    }

    //TODO: 401 non authorized message
    //TODO; 409 Indicates that the request could not be processed because of conflict in the request, such as an edit conflict between multiple simultaneous updates.
});

router.delete("/studentenhuis/:huisId?", (request, result) => {
   db.deleteStudentenhuis(request.params.huisId, (rows) => {
        if (rows) {
            result.status(200);
            result.json(rows);
        }  else {
            result.status(404).json({message: "Niet gevonden (huisId bestaat niet)", code: 404, datetime: moment().format("Y-mm-D:hh:mm:ss")});
        }
    });
    //TODO: 401 non authorized message
    //TODO; 409 Indicates that the request could not be processed because of conflict in the request, such as an edit conflict between multiple simultaneous updates.

});

//Routes for Meals
router.post("/studentenhuis/:huisId?/maaltijd", (request, result) => {
    if(Object.keys(request.body).length === 0) {
        result.status(412).json({message: "Een of meer properties in de request body ontbreken of zijn foutief", code: 412, datetime: moment().format("Y-mm-D:hh:mm:ss")});
    }  else if (!request.body.name.toString() === "" && !request.body.beschrijving.toString() === "" && !request.body.ingredienten.toString() === "" && !request.body.allergie.toString() === "" && !request.body.prijs.toString() === "") {
        db.newMaaltijd(request.body.naam, request.body.beschrijving, request.body.ingredienten, request.body.allergie, request.body.prijs, 1, huisId, (rows) => {
            db.getMaaltijd(1, huisId, rows.insertId, (rows) => {
                if (rows) {
                    result.status(200);
                    result.json(rows);
                }  else {
                    result.status(404).json({message: "Niet gevonden (huisId bestaat niet)", code: 404, datetime: moment().format("Y-mm-D:hh:mm:ss")});
                }
            })
        });
    } else {
        result.status(412).json({message: "Een of meer properties in de request body ontbreken of zijn foutief", code: 412, datetime: moment().format("Y-mm-D:hh:mm:ss")});
    }
    //TODO: 401 non authorized message

});

router.get("/studentenhuis/:huisId?/maaltijd", (request, result) => {
    const huisId = request.params.huisId;
    db.getAllMaaltijden(1, huisId, (rows) => {
        if (rows) {
            result.status(200);
            result.json(rows);
        }  else {
            result.status(404).json({message: "Niet gevonden (huisId bestaat niet)", code: 404, datetime: moment().format("Y-mm-D:hh:mm:ss")});
        }
    });
    //TODO: 401 non authorized message

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
    if(Object.keys(request.body).length === 0) {
        result.status(412).json({message: "Een of meer properties in de request body ontbreken of zijn foutief", code: 412, datetime: moment().format("Y-mm-D:hh:mm:ss")});
    } else if(!request.body.name.toString() === "" && !request.body.beschrijving.toString() === "" && !request.body.ingredienten.toString() === "" && !request.body.allergie.toString() === "" && !request.body.prijs.toString() === "") {
        db.updateMaaltijd(request.body.naam, request.body.beschrijving, request.body.ingredienten, request.body.allergie, request.body.prijs, 1, huisId, maaltijdId, (rows) => {
            if (rows) {
                result.status(200);
                result.json(rows);
            }  else {
                result.status(404).json({message: "Niet gevonden (huisId bestaat niet)", code: 404, datetime: moment().format("Y-mm-D:hh:mm:ss")});
            }
        });
    } else {
    result.status(412).json({message: "Een of meer properties in de request body ontbreken of zijn foutief", code: 412, datetime: moment().format("Y-mm-D:hh:mm:ss")});
    }
    //TODO: 401 non authorized message
    //TODO; 409 Indicates that the request could not be processed because of conflict in the request, such as an edit conflict between multiple simultaneous updates.
    
});

router.delete("/studentenhuis/:huisId?/maaltijd/:maaltijdId?", (request, result) => {
    const huisId = request.params.huisId;
    const maaltijdId = request.params.maaltijdId;
    db.deleteMaaltijd(1, huisId, maaltijdId, (rows) => {
        if (rows) {
            result.status(200);
            result.json(rows);
        }  else {
            result.status(404).json({message: "Niet gevonden (huisId bestaat niet)", code: 404, datetime: moment().format("Y-mm-D:hh:mm:ss")});
        }
    });
    //TODO: 401 non authorized message
    //TODO; 409 Indicates that the request could not be processed because of conflict in the request, such as an edit conflict between multiple simultaneous updates.
});

module.exports = router;
