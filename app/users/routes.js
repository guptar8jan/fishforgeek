var express = require('express');
var controller = require('./users.controller.js');

var router = express.Router();

router.get('/', controller.getUsers);
router.post('/', controller.createUser);

module.exports = router;
