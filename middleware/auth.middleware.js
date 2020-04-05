const db = require('../db');

module.exports.requireAuth = function (req, res, next) {
    let logged = true;
    if (!req.cookies.userId)
        logged = false;

    let user = db.get('users').find({ id: req.cookies.userId }).value();
    if (!user)
        logged = false;

    if (logged == false)
        return res.redirect('/auth/login');

    next();
}