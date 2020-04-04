const express = require('express');
const controller = require('../controller/user.controller');

const router = express.Router();

router.get('/', controller.index);
router.get('/create', controller.create);
router.post('/create', controller.postCreate);
router.get('/:id', controller.view);

module.exports = router;