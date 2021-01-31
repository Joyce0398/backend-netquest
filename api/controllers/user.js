const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.user_login = (req, res, next) => {
    User.find({username: req.body.username})
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Auth failed'
                    });
                }
                //password is correct
                if (result) {
                    const token = jwt.sign({
                            email: user[0].email,
                            userId: user[0]._id
                        },
                        process.env.JWT_KEY,
                        {
                            expiresIn: "1h"
                        }
                    );
                    return res.status(200).json({
                        message: 'Auth successful',
                        token: token
                    });
                }
                // U return auth failed to not give away whether the password or the email is
                // incorrect
                res.status(401).json({
                    message: 'Auth failed'
                });
            });
        })
        // the error handling could be a method since it is being used a lot
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}
