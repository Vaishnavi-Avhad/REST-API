const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');
const Response = require("./response");
var router = require('./user-service');

app.use(router);

app.listen(5000, () => {
    console.log('Express server is running at http://localhost:5000');
});