const express = require('express');
const app = express();

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json');
const db = low(adapter);
db.defaults({ users:[]})
  .write()

const port = 3000;

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.set('view engine', 'pug');
app.set('views', './views');

var users = db.get('users').value();

app.get('/users', function (req, res) {
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

app.get('/users/create',(req,res)=>{
    res.render('users/create');
});

app.post('/users/create',(req,res)=>{
    // users.push(req.body);
    db.get('users').push(req.body).write();
    res.redirect('/users')
    // res.json(req.body)
});
app.get('/', function (req, res) {
    res.render('index');
});

app.listen(port, function () {
    console.log("Server listening on port " + port);
});