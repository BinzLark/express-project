const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.set('view engine', 'pug');
app.set('views', './views');

var users = [
    { id: 1, name: "Phan Viet Tan", age: 21 },
    { id: 2, name: "Nguyen Nhat Bao", age: 21 },
    { id: 3, name: "Nguyen Van Toan", age: 21 },
    { id: 4, name: "Le Van Loc", age: 21 },
    { id: 5, name: "Nguyen Ngoc Linh", age: 21 },
    { id: 5, name: "Tran Phuoc Minh", age: 21 },
];

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
    users.push(req.body);
    res.redirect('/users')
    // res.json(req.body)
});
app.get('/', function (req, res) {
    res.render('index');
});

app.listen(port, function () {
    console.log("Server listening on port " + port);
});