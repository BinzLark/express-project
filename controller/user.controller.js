const db = require('../db');
const shortid = require('shortid');

module.exports.index = function (req, res) {
    let users = db.get('users').value();
    let search = req.query.search;
    let newUser = [];
    if (search)
        newUser = users.filter(user => user.name.toLowerCase().indexOf(search.toLowerCase()) != -1);

    res.render('users/index', {
        users: newUser.length > 0 ? newUser : users,
        search: search ? search : ''
    });
};

module.exports.create = (req, res) => {
    res.render('users/create');
};

module.exports.postCreate = (req, res) => {
    req.body.id = shortid.generate();
    req.body.avatar = req.file.path.split('\\').slice(1).join("/");
    db.get('users').push(req.body).write();
    res.redirect('/users')
    // res.json(req.body)
};

module.exports.view = function (req, res) {
    let id = req.params.id;
    let user = db.get('users').find({ id }).value();
    res.render('users/detail', { user })
};


// module.exports = {
//     index(req, res) {
//         let users = db.get('users').value();
//         let search = req.query.search;
//         let newUser = [];
//         if (search)
//             newUser = users.filter(user => user.name.toLowerCase().indexOf(search.toLowerCase()) != -1);
//         res.render('users/index', {
//             users: newUser.length > 0 ? newUser : users,
//             search: search ? search : ''
//         });
//     },
//
//     create(req, res) {
//         res.render('users/create');
//     },
//
//     postCreate(req, res) {
//         req.body.id = shortid.generate();
//         db.get('users').push(req.body).write();
//         res.redirect('/users')
//     },
//     view(req, res) {//         let id = req.params.id;
//         let user = db.get('users').find({id}).value();
//         res.render('users/detail', {user})
//     }
// };
