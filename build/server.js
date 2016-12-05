///<reference path="../typings/index.d.ts"/>
"use strict";
var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var app = express();
mongoose.connect('mongodb://localhost/proc');
app.use(morgan('dev')); // Log every request to console
app.get('/', function (req, res) {
    res.send('Hello World');
});
// Routs
require('./api/softwares.js')(app);
// Initialize
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
});

//# sourceMappingURL=../build/server.js.map
