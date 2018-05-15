module.exports = {
    validateToken(req, res, next) {
        console.log("validateToken called");
        const token = req.header("x-access-token") || '';

        auth.decodeToken(token, (err, payload) => {
            if (err) {
                //Invalid token
                const error = new ApiError(err.message || err, 401);
                next(error);
            } else {
                console.log("Authenticated! Payload = ");
                console.dir(payload);
                req.user = payload.sub;
                next();
            }
        });
    },

    login(req, res, next) {
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

        // Check in database naar email (err als niet zo etc.)
        // Vervolgens ophalen van password ervan
        // Kijken of passwords matchen

        result = ""; // Result is password of email

        // Verify that the email exists and that the password matches the email.
        if(err) {
            // Email does not exist
            next(new ApiError('Invalid credentials', 401))
        } else {
            bcrypt.compare(req.body.password.trim(), result, (err, success) => {
                if (success) {
                    // Create an object containing the data we want in the payload.
                    const payload = {
                        user: result.email,
                    };
                    // Userinfo returned to the caller.
                    const userinfo = {
                        token: auth.encodeToken(payload),
                        email: result.email
                    };
                    res.status(200).json(userinfo).end();
                } else {
                    next(new ApiError('Invalid credentials', 401));
                }
            })
        }
    },

    register(req, res, next) {
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

        //Manier zoeken om in database te kijken voor duplicate email

        if(err) {
            // Duplicate email found
            const error = new ApiError(err, 412);
            next(error);
        } else {
            //Add user to database


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
    }
};