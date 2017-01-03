module.exports = function (app) {
	var UnitDb = require('../models/unit');
	var Units = UnitDb.Unit;
	var middlewares = require('../middlewares');

	// Functions

	function fetchUnits(req, res) {
		UnitDb.Unit.find()
			.exec(function (err, units) {
				if (err) {
					res.send(err);
				}
				res.header("Access-Control-Allow-Origin", "*"); // No 'Access-Control-Allow-Origin' Fix
				res.json(units);
			});
	}

	function createUnit(unit, req, res) {
		Units.create(unit, function (err, unit) {
			if (err) {
				res.send(err);
				console.error(err);
			}
			res.json(unit);
		});
	}

	function validateUnit(unit) {
		return true;
	}

	// Requests

	// GET all Units
	app.get('/api/units', middlewares.requireLogin, function (req, res) {
		console.log('Got Units');
		fetchUnits(req, res);
	})

	// GET a Unit by ID
	app.get('/api/unit/:unit_id', middlewares.requireLogin, function (req, res) {
		Units.findById(req.params.unit_id)
			.exec(function (err, unit) {
				if (err) {
					res.send(err);
				}

				res.json(unit);
			});
	});


	// POST a Unit
	app.post('/api/unit', middlewares.requireLogin, function (req, res) {
		// let unit = req.body.unit;
		let unit = {
			unitId: req.body.unitId,
			subUnit: req.body.subUnit
		}
		if (validateUnit(unit)) {
			createUnit(unit, req, res);
		}
		else {
			console.error("Error : The unit model is incorrect");
			res.status(500).send('Error : The unit model is incorrect');
		}
	});

	// DELETE a Unit by ID
	app.delete('/api/unit/:unit_id', middlewares.canEditSoft, function (req, res) {
		if(!req.params.unit_id){
		    res.send("Error: Parameter unit_id is undefined");
		}
		Units.remove({
			_id: req.params.unit_id
		}, function (err, unit) {
			if (err) {
				res.send(err);
			}
			res.json(req.params.unit_id);
		});
	});

	// PUT ?? update

};