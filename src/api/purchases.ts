module.exports = function (app) {
	var PurchaseDb = require('../models/purchase');
	var Purchases = PurchaseDb.Purchase;
	var middlewares = require('../middlewares');

	// Functions

	function fetchPurchases(req, res) {
		PurchaseDb.Purchase.find()
			.exec(function (err, softs) {
				if (err) {
					res.send(err);
				}
				res.header("Access-Control-Allow-Origin", "*"); // No 'Access-Control-Allow-Origin' Fix
				res.json(softs);
			});
	}

	function createPurchase(purchase, req, res) {
		Purchases.create(purchase, function (err, soft) {
			if (err) {
				res.send(err);
				console.error(err);
			}
			res.json(soft);
		});
	}

	function validatePurchase(soft) {
		return true;
	}

	// Requests

	// GET all Purchases
	app.get('/api/purchases', middlewares.requireLogin, function (req, res) {
		console.log('Hello World!!');
		fetchPurchases(req, res);
	})

	// GET a Purchase by ID
	app.get('/api/purchase/:purchase_id', middlewares.requireLogin, function (req, res) {
		Purchases.findById(req.params.purchase_id)
			.exec(function (err, soft) {
				if (err) {
					res.send(err);
				}

				res.json(soft);
			});
	});


	// POST a Purchase
	app.post('/api/purchase', middlewares.requireLogin, function (req, res) {
		// let purchase = req.body.purchase;
		let purchase = {
			softwareId: req.body.softwareId,
			unitId: req.body.unitId,
			subUnit: req.body.subUnit,
			amounts: req.body.amounts
		}
		if (validatePurchase(purchase)) {
			createPurchase(purchase, req, res);
		}
		else {
			console.error("Error : The purchase model is incorrect");
			res.status(500).send('Error : The purchase model is incorrect');
		}
	});

	// DELETE a Purchase by ID
	app.delete('/api/purchase/:purchase_id', middlewares.canEditSoft, function (req, res) {
		if(!req.params.purchase_id){
		    res.send("Error: Parameter purchase_id is undefined");
		}
		Purchases.remove({
			_id: req.params.purchase_id
		}, function (err, soft) {
			if (err) {
				res.send(err);
			}
			res.json(req.params.purchase_id);
		});
	});

	// PUT ?? update

};