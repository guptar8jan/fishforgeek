var express = require('express');
var controller = require('./users.controller.js');

var router = express.Router();

router.get('/', controller.getUsers);

module.exports = router;
