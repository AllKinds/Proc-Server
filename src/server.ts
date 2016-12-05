///<reference path="../typings/index.d.ts"/>

import * as express from 'express';
import * as http from 'http';
import * as fs from 'fs';
import * as mongoose from 'mongoose';
import * as morgan from 'morgan';

var app = express();

mongoose.connect('mongodb://localhost/proc');

app.use(morgan('dev')); 		// Log every request to console

app.get('/', function (req, res) {
   res.send('Hello World');
})

// Routs
require('./api/softwares.js')(app);
// Initialize
var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log("Example app listening at http://%s:%s", host, port); 
})