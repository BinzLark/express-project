const express = require('express');
const controller = require('../controller/user.controller');
const middleware = require('../middleware/user.middleware');

const router = express.Router();

router.get('/', controller.index);
router.get('/create', controller.create);
router.post('/create', middleware.postCreate, controller.postCreate);
router.get('/:id', controller.view);

module.exports = router;