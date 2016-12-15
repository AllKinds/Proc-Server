///<reference path="../typings/index.d.ts"/>

import * as express 	from 'express';
import * as cors 		from 'cors';
import * as http 		from 'http';
import * as bodyParser 	from 'body-parser';		// Pull info grom HTML POST
import * as fs 			from 'fs';
import * as mongoose 	from 'mongoose';
import * as morgan 		from 'morgan';			// Log every request to console

var app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/proc');

app.use(cors());
app.use(morgan('dev')); 		

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

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