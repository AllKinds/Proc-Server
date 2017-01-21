///<reference path="../typings/index.d.ts"/>
"use strict";
var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser"); // Pull info grom HTML POST
var methodOverride = require("method-override"); // Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
var mongoose = require("mongoose");
var morgan = require("morgan"); // Log every request to console
var app = express();
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/proc');
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.get('/', function (req, res) {
    res.send('Hello World');
});
// Routs
require('./api/softwares')(app);
require('./api/purchases')(app);
require('./api/unit')(app);
require('./api/misc')(app);
// Initialize
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
});

//# sourceMappingURL=../build/server.js.map
