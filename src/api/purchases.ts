import { AmountByYear } from '../models/purchase';
import * as pManager from '../managers/purchases';


module.exports = function (app) {
	var middlewares = require('../middlewares');
	// Functions

	function validatePurchase(prcs) {
		return true;
	}

	function newAmountForYear(purchaseId: string, amountOfYear: AmountByYear, res) {
		pManager.getPurchase(purchaseId).then(function(purchase) {
			let years = [];
			for(let i=0; i< purchase.amounts.length; i++) {
				years.push( purchase.amounts[i].year );
			}
			if(years.includes(amountOfYear.year)){
				// Udpate the yearlyAmount
				let year_index = years.indexOf(amountOfYear.year);
				if(amountOfYear.amount <= 0) {
					purchase.amounts.splice(year_index, 1);
				}
				else { purchase.amounts[year_index] =  amountOfYear; }	
			}
			else if(amountOfYear.amount > 0) {
				purchase.amounts.push(amountOfYear);
			}
			pManager.updatePurchase(purchase).then(function(prc) {
				console.log(prc.amounts);
				res.json(prc);
				console.log("There");
			}).catch(function(err) {
				res.send(err);
				console.log(err);
			});
		}).catch(function(err) {
				res.send(err);
				console.log(err);
		});
	}

	// Requests

	// GET all Purchases
	app.get('/api/purchases', function (req, res) {
		pManager.getAllPurchases().then(function(prc) {
			res.json(prc);
		}).catch(function(err) {
			res.send(err);
			console.log(err);
		});
	});

	app.get('/api/purchases/byUnit/:unit_id', function (req, res) {
		let unit_id = req.params.unit_id;
		if(unit_id) {
			pManager.getPurchaseByUnit(unit_id).then(function(purchases) {
				res.json(purchases);
			}).catch(function(err) {
				res.send(err);
				console.log(err);
			});
		}
	});

	// GET a Purchase by ID
	app.get('/api/purchase/getOne/:purchase_id', middlewares.requireLogin, function (req, res) {
		let id = req.params.purchase_id;
		pManager.getPurchase(id).then(function(purchase) {
			res.json(purchase);
		}).catch(function(err) {
			res.send(err);
			console.log(err);
		});
	});

	// Get a Purchase by SoftwareId
	app.get('/api/purchases/bySoftware/:software_id', middlewares.requireLogin, function(req, res) {
		let soft_id = req.params.software_id;
		console.log(soft_id);
		pManager.getPurchaseBySoftware(soft_id).then(function(purchase) {
			res.json(purchase);
		}).catch(function(err) {
			res.send(err);
			console.log(err);
		});

	})

	// Delete Purhcases of a specific Software
	app.delete('/api/purchases/bySoftware/:software_id', middlewares.requireLogin, function(req, res) {
		let soft_id = req.params.software_id;
		console.log(soft_id);
		pManager.deletePurchasesBySoftware(soft_id).then(function(purchase) {
			res.json(purchase);
		}).catch(function(err) {
			res.send(err);
			console.log(err);
		});

	})

	// Delete Purhcases of a specific Unit
	app.delete('/api/purchases/byUnit/:unit_id', middlewares.requireLogin, function(req, res) {
		let unit_id = req.params.unit_id;
		console.log(unit_id);
		pManager.deletePurchasesByUnit(unit_id).then(function(purchase) {
			res.json(purchase);
		}).catch(function(err) {
			res.send(err);
			console.log(err);
		});

	})

	// POST a Purchase
	app.post('/api/purchase', middlewares.requireLogin, function (req, res) {
		// let purchase = req.body.purchase;
		let purchase = {
			software: req.body.software,
			unit: req.body.unit,
			amounts: req.body.amounts
		}
		if (validatePurchase(purchase)) {
			pManager.addPurchase(purchase).then(function(prc) {
				res.json(prc);
			}).catch(function(err) {
				res.send(err);
				console.log(err);
			})
		}
		else {
			console.error("Error : The purchase model is incorrect");
			res.status(500).send('Error : The purchase model is incorrect');
		}
	});

	// DELETE a Purchase by ID
	app.delete('/api/purchase/:purchase_id', middlewares.canEditSoft, function (req, res) {
		let id = req.params.purchase_id;
		if(!id){
		    res.send("Error: Parameter purchase_id is undefined");
		}
		pManager.removePurchase(id).then(function(purchase) {
			res.json(id);
		}).catch(function(err) {
			res.send(err);
			console.log(err);
		})
	});

	// PUT ?? update
	app.put('/api/purchase/:purchase_id/newYear', middlewares.canEditSoft, function (req, res) {
		let amountByYear: AmountByYear = req.body.amountByYear;
		let purchase_id: string = req.params.purchase_id;
		newAmountForYear(purchase_id, amountByYear, res);
	});
};