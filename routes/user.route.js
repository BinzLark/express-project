const express = require('express');
var multer = require('multer')

const controller = require('../controller/user.controller');
const middleware = require('../middleware/user.middleware');

const router = express.Router();
var upload = multer({ dest: './public/uploads/' })

router.get('/', controller.index);
router.get('/create', controller.create);
router.post('/create',
    upload.single('avatar'),
    middleware.postCreate,
    controller.postCreate
);
router.get('/:id', controller.view);

module.exports = router;