const express = require("express");
const moment = require("moment");
const db = require("../database/db_Functions");
const bodyParser = require('body-parser');
const auth =  require('../auth/authentication');
const router = express.Router();

router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: true }));


//
// Catch all except login
//
router.all( new RegExp("[^(\/login)]"), function (req, res, next) {

    //
    console.log("VALIDATE TOKEN");

    const token = (req.header('X-Access-Token')) || '';

    auth.decodeToken(token, (err, payload) => {
        if (err) {
            console.log('Error handler: ' + err.message);
            res.status(401).json({message: "Niet geautoriseerd (geen valid token)", code: 401, datetime: moment().format("Y-mm-D:hh:mm:ss")});
        } else {
            next();
        }
    });
});

//
// Login with {"username":"<username>", "password":"<password>"}
//
router.route('/login')

    .post( function(req, res) {

        //
        // Get body params or ''
        //
        const email = req.body.email;
        const password = req.body.password;

        //
        // Check in datasource for email & password combo.
        //
        //
        db.Login(email, password, (rows, email, password) => {
            if( rows ) {
                res.status(200).json({"token" : auth.encodeToken(email), "email" : email});
            } else {
                res.status(401).json({"error":"Invalid credentials, bye"})
            }
        });
    });

router.get("/hello", (request, result) => {
    result.json("Hello World!");
});

router.get("/goodnight", (request, result) => {
    result.json("Goodnight World!");
});
//Routes for Deelnemers
router.post("/studentenhuis/:huisId?/maaltijd/:maaltijdId?/deelnemers", (request, result) => {
    //TODO
    const token = (request.header('X-Access-Token')) || '';

    auth.decodeToken(token, (err, payload) => {
        if (err) {
            console.log('Error handler: ' + err.message);
            res.status(401).json({
                message: "Niet geautoriseerd (geen valid token)",
                code: 401,
                datetime: moment().format("Y-mm-D:hh:mm:ss")
            });
        } else {
            console.log(payload.sub);
            console.log("test");
            db.getUserId(payload.sub, (rows) => {
                const userId = rows[0].ID;

                db.getDeelnemer(request.params.maaltijdId, request.params.huisId, (rows) => {
                    if (rows[0].UserID === userId) {
                        result.status(200);
                        result.json(rows);
                    } else {
                        db.newDeelnemer(request.params.maaltijdId, request.params.huisId, userId, (rows) => {
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
            })
        }
    });
});

router.get("/studentenhuis/:huisId?/maaltijd/:maaltijdId?/deelnemers", (request, result) => {
    if(1 == 2) {
        result.status(401).json({message: "Niet geautoriseerd (geen valid token)", code: 401, datetime: moment().format("Y-mm-D:hh:mm:ss")});
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
    //TODO
    const token = (request.header('X-Access-Token')) || '';

    auth.decodeToken(token, (err, payload) => {
        if (err) {
            console.log('Error handler: ' + err.message);
            res.status(401).json({
                message: "Niet geautoriseerd (geen valid token)",
                code: 401,
                datetime: moment().format("Y-mm-D:hh:mm:ss")
            });
        } else {
            console.log(payload.sub);
            console.log("test");
            db.getUserId(payload.sub, (rows) => {
                const userId = rows[0].ID;
                console.log(userId);

                db.getMaaltijd(1, request.params.huisId, request.params.maaltijdId, (rows) => {


                    if(rows[0].UserID = userId) {
                        db.deleteDeelnemer(request.params.maaltijdId, request.params.huisId, userId, (rows) => {
                            if (rows) {
                                result.status(200);
                                result.json(rows);
                            } else {
                                result.status(404).json({
                                    message: "Niet gevonden (huisId of maaltijdId bestaat niet)",
                                    code: 404,
                                    datetime: moment().format("Y-mm-D:hh:mm:ss")
                                });
                            }
                        });

                    } else {
                        result.status(409).json({
                            message: "Conflict (Gebruiker mag deze data niet verwijderen)",
                            code: 409,
                            datetime: moment().format("Y-mm-D:hh:mm:ss")
                        });
                    }
                });


            });
        }
    });
});


//Routes for Studentenhuis
router.post("/studentenhuis", (request, result) => {
    if(1 == 2) {
        result.status(401).json({message: "Niet geautoriseerd (geen valid token)", code: 401, datetime: moment().format("Y-mm-D:hh:mm:ss")});
    } else if(Object.keys(request.body).length === 0) {
        result.status(412).json({message: "Een of meer properties in de request body ontbreken of zijn foutief", code: 412, datetime: moment().format("Y-mm-D:hh:mm:ss")});
    } else if(!request.body.naam == "" && !request.body.adres == "") {
        db.newStudentenhuis(request.body.naam, request.body.adres, 1, (rows) => {
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
        result.status(401).json({message: "Niet geautoriseerd (geen valid token)", code: 401, datetime: moment().format("Y-mm-D:hh:mm:ss")});
    } else {
        db.getStudentenhuis((rows) => {
            result.status(200);
            result.json(rows);
        });
    }
});

router.get("/studentenhuis/:huisId?", (request, result) => {
    if(1 == 2) {
        result.status(401).json({message: "Niet geautoriseerd (geen valid token)", code: 401, datetime: moment().format("Y-mm-D:hh:mm:ss")});
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
    //TODO
    const token = (request.header('X-Access-Token')) || '';

    auth.decodeToken(token, (err, payload) => {
        if (err) {
            console.log('Error handler: ' + err.message);
            res.status(401).json({
                message: "Niet geautoriseerd (geen valid token)",
                code: 401,
                datetime: moment().format("Y-mm-D:hh:mm:ss")
            });
        } else {
            console.log(payload.sub);
            console.log("test");
            db.getUserId(payload.sub, (rows) => {
                const userId = rows[0].ID;

                db.getStudentenhuisWithId(request.params.huisId, (rows) => {
                    if(rows[0].UserID === userId) {
                        if(Object.keys(request.body).length === 0) {
                            result.status(412).json({message: "Een of meer properties in de request body ontbreken of zijn foutief", code: 412, datetime: moment().format("Y-mm-D:hh:mm:ss")});
                        } else if (!request.body.naam == "" && !request.body.adres == "") {
                            db.updateStudentenhuis(request.body.naam, request.body.adres, request.params.huisId, (rows) => {
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
                    } else {
                        result.status(409).json({
                            message: "Conflict (Gebruiker mag deze data niet verwijderen)",
                            code: 409,
                            datetime: moment().format("Y-mm-D:hh:mm:ss")
                        });
                    }
                });
            });
        }
    });
});

router.delete("/studentenhuis/:huisId?", (request, result) => {
    //TODO
    const token = (request.header('X-Access-Token')) || '';

    auth.decodeToken(token, (err, payload) => {
        if (err) {
            console.log('Error handler: ' + err.message);
            res.status(401).json({
                message: "Niet geautoriseerd (geen valid token)",
                code: 401,
                datetime: moment().format("Y-mm-D:hh:mm:ss")
            });
        } else {
            console.log(payload.sub);
            console.log("test");
            db.getUserId(payload.sub, (rows) => {
                const userId = rows[0].ID;

                db.getStudentenhuisWithId(request.params.huisId, (rows) => {
                    if(rows[0].UserID == userId) {

                        db.deleteStudentenhuis(request.params.huisId, userId, (rows) => {
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
                    } else {
                        result.status(409).json({
                            message: "Conflict (Gebruiker mag deze data niet verwijderen)",
                            code: 409,
                            datetime: moment().format("Y-mm-D:hh:mm:ss")
                        });
                    }
                });

            });
        }
    });
});

//Routes for Meals
router.post("/studentenhuis/:huisId?/maaltijd", (request, result) => {
    //TODO
    const token = (request.header('X-Access-Token')) || '';

    auth.decodeToken(token, (err, payload) => {
        if (err) {
            console.log('Error handler: ' + err.message);
            res.status(401).json({
                message: "Niet geautoriseerd (geen valid token)",
                code: 401,
                datetime: moment().format("Y-mm-D:hh:mm:ss")
            });
        } else {
            console.log(payload.sub);
            console.log("test");
            db.getUserId(payload.sub, (rows) => {
                const userId = rows[0].ID;

                if (Object.keys(request.body).length === 0) {
                    result.status(412).json({
                        message: "Een of meer properties in de request body ontbreken of zijn foutief",
                        code: 412,
                        datetime: moment().format("Y-mm-D:hh:mm:ss")
                    });
                } else if (!request.body.naam.toString() == "" && !request.body.beschrijving.toString() == "" && !request.body.ingredienten.toString() == "" && !request.body.allergie.toString() == "" && !request.body.prijs.toString() == "") {
                    db.newMaaltijd(request.body.naam, request.body.beschrijving, request.body.ingredienten, request.body.allergie, request.body.prijs, userId, request.params.huisId, (rows) => {
                        console.log("inside");
                        db.getMaaltijd(userId, request.params.huisId, rows.insertId, (rows) => {
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
            });
        }
    });
});

router.get("/studentenhuis/:huisId?/maaltijd", (request, result) => {
//TODO
    const token = (request.header('X-Access-Token')) || '';

    auth.decodeToken(token, (err, payload) => {
        if (err) {
            console.log('Error handler: ' + err.message);
            res.status(401).json({
                message: "Niet geautoriseerd (geen valid token)",
                code: 401,
                datetime: moment().format("Y-mm-D:hh:mm:ss")
            });
        } else {
            console.log(payload.sub);
            console.log("test");
            db.getUserId(payload.sub, (rows) => {
                const userId = rows[0].ID;


                db.getAllMaaltijden(userId, request.params.huisId, (rows) => {
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
            });
        }
    });

    router.get("/studentenhuis/:huisId?/maaltijd/:maaltijdId?", (request, result) => {
        if (1 == 2) {
            result.status(401).json({
                message: "Niet geautoriseerd (geen valid token)",
                code: 401,
                datetime: moment().format("Y-mm-D:hh:mm:ss")
            });
        } else {
            db.getMaaltijd(1, request.params.huisId, request.params.maaltijdId, (rows) => {
                result.status(200);
                result.json(rows);
            });
        }
    });

    router.put("/studentenhuis/:huisId?/maaltijd/:maaltijdId?", (request, result) => {
        //TODO
        const token = (request.header('X-Access-Token')) || '';

        auth.decodeToken(token, (err, payload) => {
            if (err) {
                console.log('Error handler: ' + err.message);
                res.status(401).json({
                    message: "Niet geautoriseerd (geen valid token)",
                    code: 401,
                    datetime: moment().format("Y-mm-D:hh:mm:ss")
                });
            } else {
                console.log(payload.sub);
                console.log("test");
                db.getUserId(payload.sub, (rows) => {
                    const userId = rows[0].ID;



                    db.getMaaltijd(userId, request.params.huisId, request.params.maaltijdId, (rows) => {
                        if (rows[0].UserID == userId) {
                            if (Object.keys(request.body).length === 0) {
                                result.status(412).json({
                                    message: "Een of meer properties in de request body ontbreken of zijn foutief",
                                    code: 412,
                                    datetime: moment().format("Y-mm-D:hh:mm:ss")
                                });
                            } else if (!request.body.naam.toString() == "" && !request.body.beschrijving.toString() == "" && !request.body.ingredienten.toString() == "" && !request.body.allergie.toString() == "" && !request.body.prijs.toString() == "") {
                                db.updateMaaltijd(request.body.naam, request.body.beschrijving, request.body.ingredienten, request.body.allergie, request.body.prijs, 1, request.params.huisId, request.params.maaltijdId, (rows) => {
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
                            } else {
                                result.status(412).json({
                                    message: "Een of meer properties in de request body ontbreken of zijn foutief",
                                    code: 412,
                                    datetime: moment().format("Y-mm-D:hh:mm:ss")
                                });
                            }
                        } else {
                            result.status(409).json({
                                message: "Conflict (Gebruiker mag deze data niet verwijderen)",
                                code: 409,
                                datetime: moment().format("Y-mm-D:hh:mm:ss")
                            });
                        }
                    });

                });
            }
        });
    });

    router.delete("/studentenhuis/:huisId?/maaltijd/:maaltijdId?", (request, result) => {
        //TODO
        const token = (request.header('X-Access-Token')) || '';

        auth.decodeToken(token, (err, payload) => {
            if (err) {
                console.log('Error handler: ' + err.message);
                res.status(401).json({
                    message: "Niet geautoriseerd (geen valid token)",
                    code: 401,
                    datetime: moment().format("Y-mm-D:hh:mm:ss")
                });
            } else {
                console.log(payload.sub);
                console.log("test");
                db.getUserId(payload.sub, (rows) => {
                    const userId = rows[0].ID;

                    db.getMaaltijd(userId, request.params.huisId, request.params.maaltijdId, (rows) => {
                        result.status(200);
                        result.json(rows);
                        if (rows[0].UserID == userId) {
                            db.deleteMaaltijd(userid, request.params.huisId, request.params.maaltijdId, (rows) => {
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
                        } else {
                            result.status(409).json({
                                message: "Conflict (Gebruiker mag deze data niet verwijderen)",
                                code: 409,
                                datetime: moment().format("Y-mm-D:hh:mm:ss")
                            });
                        }
                    });


                });
            }
        });
    });
});
module.exports = router;
