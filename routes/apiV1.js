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
    if(1 == 2) {
        result.status(404).json({message: "Niet geautoriseerd (geen valid token)", code: 404, datetime: moment().format("Y-mm-D:hh:mm:ss")});
    } else {
        db.newDeelnemer(request.params.maaltijdId, request.params.huisId, 1, (rows) => {
            if (rows) {
                result.status(200);
                result.json(rows);
            } else {
                result.status(404).json({
                    message: "Niet gevonden (huisId bestaat niet)",
                    code: 404,
                    datetime: moment().format("Y-mm-D:hh:mm:ss")
                });
            }
        });
        //TODO; 409 Indicates that the request could not be processed because of conflict in the request, such as an edit conflict between multiple simultaneous updates.
    }
});

router.get("/studentenhuis/:huisId?/maaltijd/:maaltijdId?/deelnemers", (request, result) => {
    if(1 == 2) {
        result.status(404).json({message: "Niet geautoriseerd (geen valid token)", code: 404, datetime: moment().format("Y-mm-D:hh:mm:ss")});
    } else {
        db.getDeelnemer(request.params.maaltijdId, request.params.huisId, (rows) => {
            if (rows) {
                result.status(200);
                result.json(rows);
            } else {
                result.status(404).json({
                    message: "Niet gevonden (huisId bestaat niet)",
                    code: 404,
                    datetime: moment().format("Y-mm-D:hh:mm:ss")
                });
            }
        });
    }
});

router.delete("/studentenhuis/:huisId?/maaltijd/:maaltijdId?/deelnemers", (request, result) => {
    if(1 == 2) {
        result.status(404).json({message: "Niet geautoriseerd (geen valid token)", code: 404, datetime: moment().format("Y-mm-D:hh:mm:ss")});
    } else {
        db.deleteDeelnemer(request.params.maaltijdId, request.params.huisId, 1, (rows) => {
            if (rows) {
                result.status(200);
                result.json(rows);
            } else {
                result.status(404).json({
                    message: "Niet gevonden (huisId bestaat niet)",
                    code: 404,
                    datetime: moment().format("Y-mm-D:hh:mm:ss")
                });
            }
        });
        //TODO; 409 Indicates that the request could not be processed because of conflict in the request, such as an edit conflict between multiple simultaneous updates.
    }
});


//Routes for Studentenhuis
router.post("/studentenhuis", (request, result) => {
    if(1 == 2) {
        result.status(404).json({message: "Niet geautoriseerd (geen valid token)", code: 404, datetime: moment().format("Y-mm-D:hh:mm:ss")});
    } else if(Object.keys(request.body).length === 0) {
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
});

router.get("/studentenhuis", (request, result) => {
    if(1 == 2) {
        result.status(404).json({message: "Niet geautoriseerd (geen valid token)", code: 404, datetime: moment().format("Y-mm-D:hh:mm:ss")});
    } else {
        db.getStudentenhuis((rows) => {
            result.status(200);
            result.json(rows);
        });
    }
});

router.get("/studentenhuis/:huisId?", (request, result) => {
    if(1 == 2) {
        result.status(404).json({message: "Niet geautoriseerd (geen valid token)", code: 404, datetime: moment().format("Y-mm-D:hh:mm:ss")});
    } else {
        db.getStudentenhuisWithId(request.params.huisId, (rows) => {
            if (rows) {
                result.status(200);
                result.json(rows);
            } else {
                result.status(404).json({
                    message: "Niet gevonden (huisId bestaat niet)",
                    code: 404,
                    datetime: moment().format("Y-mm-D:hh:mm:ss")
                });
            }
        });
    }
});

router.put("/studentenhuis/:huisId?", (request, result) => {
    if(1 == 2) {
        result.status(404).json({message: "Niet geautoriseerd (geen valid token)", code: 404, datetime: moment().format("Y-mm-D:hh:mm:ss")});
    } else if(Object.keys(request.body).length === 0) {
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
    //TODO; 409 Indicates that the request could not be processed because of conflict in the request, such as an edit conflict between multiple simultaneous updates.
});

router.delete("/studentenhuis/:huisId?", (request, result) => {
    if(1 == 2) {
        result.status(404).json({message: "Niet geautoriseerd (geen valid token)", code: 404, datetime: moment().format("Y-mm-D:hh:mm:ss")});
    } else {
        db.deleteStudentenhuis(request.params.huisId, (rows) => {
            if (rows) {
                result.status(200);
                result.json(rows);
            } else {
                result.status(404).json({
                    message: "Niet gevonden (huisId bestaat niet)",
                    code: 404,
                    datetime: moment().format("Y-mm-D:hh:mm:ss")
                });
            }
        });
        //TODO; 409 Indicates that the request could not be processed because of conflict in the request, such as an edit conflict between multiple simultaneous updates.
    }
});

//Routes for Meals
router.post("/studentenhuis/:huisId?/maaltijd", (request, result) => {
    if(1 == 2) {
        result.status(404).json({message: "Niet geautoriseerd (geen valid token)", code: 404, datetime: moment().format("Y-mm-D:hh:mm:ss")});
    } else {
        if (Object.keys(request.body).length === 0) {
            result.status(412).json({
                message: "Een of meer properties in de request body ontbreken of zijn foutief",
                code: 412,
                datetime: moment().format("Y-mm-D:hh:mm:ss")
            });
        } else if (!request.body.name.toString() === "" && !request.body.beschrijving.toString() === "" && !request.body.ingredienten.toString() === "" && !request.body.allergie.toString() === "" && !request.body.prijs.toString() === "") {
            db.newMaaltijd(request.body.naam, request.body.beschrijving, request.body.ingredienten, request.body.allergie, request.body.prijs, 1, request.params.huisId, (rows) => {
                db.getMaaltijd(1, request.params.huisId, rows.insertId, (rows) => {
                    if (rows) {
                        result.status(200);
                        result.json(rows);
                    } else {
                        result.status(404).json({
                            message: "Niet gevonden (huisId bestaat niet)",
                            code: 404,
                            datetime: moment().format("Y-mm-D:hh:mm:ss")
                        });
                    }
                })
            });
        } else {
            result.status(412).json({
                message: "Een of meer properties in de request body ontbreken of zijn foutief",
                code: 412,
                datetime: moment().format("Y-mm-D:hh:mm:ss")
            });
        }
    }
});

router.get("/studentenhuis/:huisId?/maaltijd", (request, result) => {
    if(1 == 2) {
        result.status(404).json({message: "Niet geautoriseerd (geen valid token)", code: 404, datetime: moment().format("Y-mm-D:hh:mm:ss")});
    } else {
        db.getAllMaaltijden(1, request.params.huisId, (rows) => {
            if (rows) {
                result.status(200);
                result.json(rows);
            } else {
                result.status(404).json({
                    message: "Niet gevonden (huisId bestaat niet)",
                    code: 404,
                    datetime: moment().format("Y-mm-D:hh:mm:ss")
                });
            }
        });
    }
});

router.get("/studentenhuis/:huisId?/maaltijd/:maaltijdId?", (request, result) => {
    if(1 == 2) {
        result.status(404).json({message: "Niet geautoriseerd (geen valid token)", code: 404, datetime: moment().format("Y-mm-D:hh:mm:ss")});
    } else {
        db.getMaaltijd(1, request.params.huisId, request.params.maaltijdId, (rows) => {
            result.status(200);
            result.json(rows);
        });
    }
});

router.put("/studentenhuis/:huisId?/maaltijd/:maaltijdId?", (request, result) => {
    if(1 == 2) {
        result.status(404).json({message: "Niet geautoriseerd (geen valid token)", code: 404, datetime: moment().format("Y-mm-D:hh:mm:ss")});
    } else if(Object.keys(request.body).length === 0) {
        result.status(412).json({message: "Een of meer properties in de request body ontbreken of zijn foutief", code: 412, datetime: moment().format("Y-mm-D:hh:mm:ss")});
    } else if(!request.body.name.toString() === "" && !request.body.beschrijving.toString() === "" && !request.body.ingredienten.toString() === "" && !request.body.allergie.toString() === "" && !request.body.prijs.toString() === "") {
        db.updateMaaltijd(request.body.naam, request.body.beschrijving, request.body.ingredienten, request.body.allergie, request.body.prijs, 1, request.params.huisId, request.params.maaltijdId, (rows) => {
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
    //TODO; 409 Indicates that the request could not be processed because of conflict in the request, such as an edit conflict between multiple simultaneous updates.

});

router.delete("/studentenhuis/:huisId?/maaltijd/:maaltijdId?", (request, result) => {
    if(1 == 2) {
        result.status(404).json({message: "Niet geautoriseerd (geen valid token)", code: 404, datetime: moment().format("Y-mm-D:hh:mm:ss")});
    } else {
        db.deleteMaaltijd(1, request.params.huisId, request.params.maaltijdId, (rows) => {
            if (rows) {
                result.status(200);
                result.json(rows);
            }  else {
                result.status(404).json({message: "Niet gevonden (huisId bestaat niet)", code: 404, datetime: moment().format("Y-mm-D:hh:mm:ss")});
            }
        });
    }
    //TODO; 409 Indicates that the request could not be processed because of conflict in the request, such as an edit conflict between multiple simultaneous updates.
});

module.exports = router;
