const db = require("../database/db_Functions");

module.exports = {
    validateToken(req, res, next) {
        console.log("validateToken called");
        const token = req.header("x-access-token") || '';

        auth.decodeToken(token, (err, payload) => {
            console.log("validation test");
            if (err) {
                //Invalid token
                const error = new ApiError(err.message || err, 401);
                console.log("validation error");
                next(error);
            } else {
                console.log("Authenticated! Payload = ");
                console.dir(payload);
                req.user = payload.sub;
                console.log("validation success");
                next();
            }
        });
        console.log("validateToken ended");
    },

    login(req, res, next) {
        console.log("Login start");
        // Verify that we receive the expected input
        try {
            assert(typeof (req.body.email) === 'string', 'email must be a string.');
            assert(typeof (req.body.password) === 'string', 'password must be a string.');
        }
        catch (ex) {
            const error = new ApiError(ex.toString(), 422);
            next(error);
            return;
        }

        console.log("got past first test");
        // Check in database naar email (err als niet zo etc.)
        db.login(req.body.email, req.body.password, (err, rows) => {
            res.json(rows);
        });

        console.log(rows);
        if (rows) {
            bcrypt.compare(req.body.password.trim(), rows, (err, success) => {
                if (success) {
                    // Create an object containing the data we want in the payload.
                    const payload = {
                        user: rows.email,
                    };
                    // Userinfo returned to the caller.
                    const userinfo = {
                        token: auth.encodeToken(payload),
                        email: rows.email
                    };
                    res.status(200).json(userinfo).end();
                    console.log("win");
                } else {
                    next(new ApiError('Invalid credentials', 401));
                    console.log("lose 2");
                }
            });
        } else {
            next(new ApiError('Invalid credentials', 401));
            console.log("lose 1");
        }
    },

    register(req, res, next) {
        console.log("register start");
        try {
            assert(typeof (req.body.firstname) === 'string', 'firstname must be a string.');
            assert(typeof (req.body.lastname) === 'string', 'lastname must be a string.');
            assert(typeof (req.body.email) === 'string', 'email must be a string.');
            assert(typeof (req.body.password) === 'string', 'password must be a string.');
        }
        catch (ex) {
            const error = new ApiError(ex.toString(), 412);
            next(error);
            return
        }

        //Add user to database
        db.Register(req.body.firstname, req.body.lastname, req.body.email, req.body.password);

        // Create an object containing the data we want in the payload.
        const payload = {
            user: req.body.email
        };
        // Userinfo returned to the caller.
        const userinfo = {
            token: auth.encodeToken(payload),
            email: req.body.email
        };
        res.status(200).json(userinfo).end();
    }
};