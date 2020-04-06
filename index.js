require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser')

const userRoute = require('./routes/user.route');
const authRoute = require('./routes/auth.route');
const productRoute = require('./routes/product.route')
const authMiddleware = require('./middleware/auth.middleware');

const port = 3000;
const app = express();

app.use(express.static('public'));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET));

app.set('view engine', 'pug');
app.set('views', './views');

app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/auth', authRoute);
app.use('/products',productRoute);

app.get('/', function (req, res) {
    res.render('index');
});

app.listen(port, function () {
    console.log("Server listening on port " + port);
});