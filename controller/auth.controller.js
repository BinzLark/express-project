const md5 = require('md5');
const db = require('../db');
module.exports.login = function (req, res, next) {
    res.render("auth/login",{
        csrfToken: req.csrfToken()
    });
};

module.exports.postLogin = function (req, res, next) {
    let { username, password } = req.body;

    let user = db.get('users').find({ username }).value();
    let errors = [];
    if (!user) {
        errors = ['User does not exist.'];
    }
    else if (user.password !== md5(password)) {
        errors = ['Wrong password.']
    }

    if (errors.length) {
        res.render('auth/login', {
            errors, old: req.body
        });
        return;
    }

    res.cookie(
        'userId',
        user.id,
        { signed: true }
    );
    res.redirect('/users');
};
