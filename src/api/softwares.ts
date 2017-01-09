// import { getAll, getOne, add, remove} from '../managers/templateManager';
import { getAllSoftwares, getSoftware, addSoftware, removeSoftware} from '../managers/softwares';

module.exports = function (app) {
	var SoftwareDb = require('../models/software');
	var Softwares = SoftwareDb.Software;
	var middlewares = require('../middlewares');


	// Functions

	function validateSoftware(soft) {
		return true;
	}

	// Requests

	// GET all Softwares
	app.get('/api/softwares', middlewares.requireLogin, function (req, res) {
		getAllSoftwares().then(function(result) {
			res.json(result);
		}).catch(function(err) {
			res.send(err);
			console.error(err);
		})
	})

	// GET a Software by ID
	app.get('/api/software/:software_id', middlewares.requireLogin, function (req, res) {
		let id = req.params.software_id
		getSoftware(id).then(function(soft) {
			res.json(soft);
		}).catch(function(err) {
			res.send(err);
			console.log(err);
		})
	});


	// POST a Software
	app.post('/api/software', middlewares.requireLogin, function (req, res) {
		let software = {
			softwareId: req.body.softwareId,
			softwareName: req.body.softwareName,
			publisherName: req.body.publisherName,
			licenceCost: req.body.licenceCost
		}
		if (validateSoftware(software)) {
			addSoftware(software).then(function(soft) {
				res.json(soft)
			}).catch(function(err) {
				res.send(err);
				console.log(err);
			})
		}
		else {
			console.error("Error : The software model is incorrect");
			res.status(500).send('Error : The software model is incorrect');
		}
	});

	// DELETE a Software by ID
	app.delete('/api/software/:software_id', middlewares.canEditSoft, function (req, res) {
		let id = req.params.software_id
		if(!id){
		    res.send("Error: Parameter software_id is undefined");
		}
		removeSoftware(id).then(function(soft) {
			res.json(id);
		}).catch(function(err) {
			console.log(err);
			res.send(err);
		})
	});

	// PUT ?? update

};