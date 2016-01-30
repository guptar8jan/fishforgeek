var express = require('express');
var controller = require('./users.controller.js');

var router = express.Router();

router.get('/:id', controller.getUsers);
router.get('/', controller.getUsers);
router.post('/', controller.createUser);
router.put('/:id', controller.updateUser);
router.patch('/:id', controller.patchUser);

module.exports = router;
