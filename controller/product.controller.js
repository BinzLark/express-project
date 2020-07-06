const db = require('../db');

const perPage = 8;

module.exports.index = function (req, res) {
    let page = req.query.page || 1;
    let start = (page - 1) * perPage;
    let end = page * perPage;
    let products = db.get('products').value().slice(start, end);
    res.render('products/index', {
        products
    });
};