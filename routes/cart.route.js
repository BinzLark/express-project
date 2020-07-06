const express = require('express');
const controlller = require('../controller/cart.controller');
const router = express.Router();

router.get('/add/:productId',controlller.addToCart);

module.exports = router;