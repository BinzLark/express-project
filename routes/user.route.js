const express = require('express');
const shortid = require('shortid');
const db = require('../db');
const router = express.Router();

var users = db.get('users').value();

router.get('/', function (req, res) {
    let search = req.query.search;
    let newUser = [];
    if (search)
        newUser = users.filter(user => user.name.toLowerCase().indexOf(search.toLowerCase()) != -1);
    console.log(search);
    res.render('users/index', {
        users: newUser.length > 0 ? newUser : users,
        search: search ? search : ''
    });
});

router.get('/create', (req, res) => {
    res.render('users/create');
});

router.post('/create', (req, res) => {
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect('/users')
    // res.json(req.body)
});


router.get('/:id', function (req, res) {
    let id = req.params.id;
    let user = db.get('users').find({ id }).value();
    res.render('users/detail', { user })
});

module.exports = router;