import { getAllUnits, getUnit, addUnit, removeUnit} from '../managers/units';

module.exports = function (app) {
	// var UnitDb = require('../models/unit');
	// var Units = UnitDb.Unit;
	var middlewares = require('../middlewares');

	// Functions

	function validateUnit(unit) {
		return true;
	}

	// Requests

	// GET all Units
	app.get('/api/units', middlewares.requireLogin, function (req, res) {
		// console.log('Got Units');
		getAllUnits().then(function(unit) {
			res.json(unit);
		}).catch(function(err) {
			res.send(err);
			console.log(err);
		});
		// fetchUnits(req, res);
	})

	// GET a Unit by ID
	app.get('/api/unit/:unit_id', middlewares.requireLogin, function (req, res) {
		let id = req.params.unit_id;
		getUnit(id).then(function(unit) {
			res.json(unit);
		}).catch(function(err) {
			res.send(err);
			console.log(err);
		});
	});


	// POST a Unit
	app.post('/api/unit', middlewares.requireLogin, function (req, res) {
		let unit = {
			unitId: req.body.unitId,
			subUnit: req.body.subUnit
		}
		if (validateUnit(unit)) {
			addUnit(unit).then(function(unit) {
				res.json(unit);
			}).catch(function(err) {
				res.send(err);
				console.log(err);
			});
			// createUnit(unit, req, res);
		}
		else {
			console.error("Error : The unit model is incorrect");
			res.status(500).send('Error : The unit model is incorrect');
		}
	});

	// DELETE a Unit by ID
	app.delete('/api/unit/:unit_id', middlewares.canEditSoft, function (req, res) {
		let id = req.params.unit_id;
		if(!id){
		    res.send("Error: Parameter unit_id is undefined");
		}
		removeUnit(id).then(function(unit) {
			res.json(id);
		}).catch(function(err) {
			res.send(err);
			console.log(err);
		});
	});

	// PUT ?? update

};