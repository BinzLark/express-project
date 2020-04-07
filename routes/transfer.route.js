const express = require('express');
const controlller = require('../controller/transfer.controller');
const router = express.Router();

router.get('/create', controlller.create);
router.post('/create', controlller.postCreate);

module.exports = router;