import { AmountByYear } from '../models/purchase';

module.exports = function (app) {
	var PurchaseDb = require('../models/purchase');
	var Purchases = PurchaseDb.Purchase;
	var SoftwareDb = require('../models/software');
	var Softwares = SoftwareDb.Software;
	var middlewares = require('../middlewares');



	// Functions

	function fetchPurchases(req, res) {
		PurchaseDb.Purchase.find()
			.populate('software')
			.exec(function (err, softs) {
				if (err) {
					res.send(err);
				}
				console.log(softs[0].software)
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
			// purchase.populate('software');
			res.json(soft);
		});
	}

	function validatePurchase(soft) {
		return true;
	}

	function newAmountForYear(purchaseId: string, amountOfYear: AmountByYear, res) {
		Purchases.findById(purchaseId, function(err, purchase) {
			if(err) {
				res.send(err);
				console.error(err);
			}
			if(!purchase){
				res.status(404).send('Purchase not found');
			}
			else {
				let years = [];
				for(let i=0; i< purchase.amounts.length; i++) {
					years.push( purchase.amounts[i].year );
				}
				// for(let yearlyAmount in purchase.amounts){
				// 	years.push(yearlyAmount.year);
				// }
				if(years.includes(amountOfYear.year)){
					// Udpate the yearlyAmount
					let year_index = years.indexOf(amountOfYear.year);
					if(amountOfYear.amount <= 0) {
						purchase.amounts.splice(year_index, 1);
					}
					else {
						purchase.amounts[year_index] =  amountOfYear;
					}
				}
				else if(amountOfYear.amount > 0) {
					purchase.amounts.push(amountOfYear);
				}
				purchase.save(function(err) {
					if(err) {
						console.log(err);
						res.status(500).send('Internal Server Error \nCan\'t change status of request. \nContact system admin.');
					} else {
						res.json(purchase);
					}
				});
			}
		})
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
			software: req.body.software,
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
	app.put('/api/purchase/:purchase_id/newYear', middlewares.canEditSoft, function (req, res) {
		let amountByYear: AmountByYear = req.body.amountByYear;
		// let amountByYear = {"year": 1970,"amount": 5};
		let purchase_id: string = req.params.purchase_id;
		newAmountForYear(purchase_id, amountByYear, res);
	});
};