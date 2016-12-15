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
			res.header("Access-Control-Allow-Origin", "*"); // No 'Access-Control-Allow-Origin' Fix
			res.json(softs);
		});
	}

	function createSoftware(software, req, res) {
		Softwares.create(software, function (err, soft) {
			if (err) {
				res.send(err);
				console.error(err);
			}
			res.json(soft);
		});
	}

	function validateSoftware (soft) {
		return true;
	}

// Requests

	// GET all Softwares
	app.get('/api/softwares', middlewares.requireLogin, function (req, res) {
		console.log('Hello World!!');
		fetchSoftwares(req, res);
	})

	// GET a Software by ID
	app.get('api/software/:software_id', middlewares.requireLogin, function (req, res) {
		Softwares.findById(req.params.software_id)
		.exec(function(err,soft) {
			if(err) {
				res.send(err);
			}

			res.json(soft);
		});
	});

	// POST a Software
	app.post('/api/software', middlewares.requireLogin, function (req, res) {
		// let software = req.body.software;
		let software = {
			softwareId: req.body.productId,
			softwareName: req.body.productName,
			publisherName: req.body.publisherName,
			licenceCost: req.body.licenceCost
		}
		if (validateSoftware(software)) {
			createSoftware(software, req, res);
		}
		else {
			console.error("Error : The software model is incorrect");
			res.status(500).send('Error : The software model is incorrect');
		}
	});

	// DELETE a Software by ID
	app.delete('api/software/:software_id', middlewares.canEditSoft, function(req, res) {
		Softwares.remove({
			_id: req.params.software_id
		}, function (err, soft) {
			if(err) {
				res.send(err);
			}
			res.json(req.params.software_id);
		});
	});

	// PUT ?? update
	
};