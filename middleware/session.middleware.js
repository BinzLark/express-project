const shortid = require('shortid');
const db = require('../db');
module.exports = function (req, res, next) {
    let sessionId = req.signedCookies.sessionId;
    if (!sessionId) {

        sessionId = shortid.generate();
        res.cookie('sessionId', sessionId, {
            signed: true
        });

        db.get('sessions').push({
            id: sessionId
        }).write();
    }

    let cart = db.get('sessions')
        .find({ id: sessionId })
        .get('cart')
        .value();
    let totalCart = 0;
    for (let idProduct in cart) {
        totalCart += cart[idProduct];
    }

    res.locals.totalCart = totalCart;

    next();
}