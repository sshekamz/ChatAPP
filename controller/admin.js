const bycrypt=require('bcrypt');

const jwt=require('jsonwebtoken');

const User=require('../models/user');

function generateAccessToken(id) {
    return jwt.sign(id, process.env.TOKEN_SECRET);
}

exports.signup = (req, res) => {
    const { name, email, phone, password } = req.body;

    User.findAll({ where: {email} })
        .then((user) => {
            if (user.length > 0) {
                return res.status(403).json({ success: false, message: 'email already exits' });
            }

            const saltRounds = 10;
            bycrypt.genSalt(saltRounds, function (err, salt) {
                bycrypt.hash(password, salt, function (err, hash) {
                    if (err) {
                        console.log(err);
                    }
                    User.create({ name, email, phone, password: hash })
                        .then(() => {
                            res.status(201).json({ success: true, message: 'user created successfully' });
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                })
            });
        }).catch(err=>console.log(err))
};