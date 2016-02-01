import express from 'express'

export var app = express();
module.exports = app;

app.use('/users', require('./users/routes.js'));
