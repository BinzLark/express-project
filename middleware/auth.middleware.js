const db = require('../db');

module.exports.requireAuth = function (req, res, next) {
    let logged = true;
    if (!req.signedCookies.userId)
        logged = false;

    let user = db.get('users').find({ id: req.signedCookies.userId }).value();
    if (!user)
        logged = false;

    if (logged == false)
        return res.redirect('/auth/login');

    res.locals.user = user;
    next();
}