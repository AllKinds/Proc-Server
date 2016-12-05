// var express 	= 	require('express'),
// 	app 		= 	express(),
// 	https 		= 	require('https'),
// 	fs 			= 	require('fs'),
// 	mongoose 	= 	require('mongoose'),
// 	morgan 		= 	require('morgan');

import * as express from 'express';
import * as http from 'http';
import * as fs from 'fs';
import * as mongoose from 'mongoose';
import * as morgan from 'morgan';


var app = express();

// Requset = require('./app/models/require')

// Configuration

// mongoose
mongoose.connect('mongodb://localhost/proc');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('We\'re connected!');
})

app.use(morgan('dev')); 		// Log every request to console

app.get('/', function (req, res) {
   res.send('Hello World');
})

// Routs

// Initialize
var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log("Example app listening at http://%s:%s", host, port); 
})