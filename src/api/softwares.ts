module.exports = function(app) {
	var SoftwareDb = require('../models/software');
	var Softwares = SoftwareDb.Software;
	var middlewares = require('../middlewares');

// Functions

	function fetchSoftwares(req, res) {
		SoftwareDb.Software.find()
		.exec(function(err, softs) {
			if (err) {
				res.send(err);
			}
			res.json(softs);
		});
	}

	function createSoftware(software, req, res) {
		Softwares.create(software, function (err, software) {
			if (err) {
				res.send(err);
				console.error(err);
			}
		});
	}

	function validateSoftware (soft) {
		return true;
	}

// Requests

	// GET /api/softwares
	app.get('/api/softwares', middlewares.requireLogin, function (req, res) {
		console.log('Hello World!!');
		fetchSoftwares(req, res);
	})

	app.post('/api/softwares', middlewares.requireLogin, function (req, res) {
		// let software = req.body.software;
		let software = {
			softwareId:'1',
			softwareName: 'Aba',
			publisherName: 'Ima',
			licenceCost: 500
		}
		if (validateSoftware(software)) {
			createSoftware(software, req, res);
		}
		else {
			console.error("Error : The software model is incorrect");
			res.status(500).send('Error : The software model is incorrect');
		}
	});
};