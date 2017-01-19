import { getAll, getOne, getByField, add, remove, update, filterObjects} from '../managers/templateManager';

var PurchaseDb = require('../models/purchase');
var Purchases = PurchaseDb.Purchase;
var ObjectId = require('mongoose').Types.ObjectId; 

export function getAllPurchases() {
	return new Promise(function(resolve, reject) {
		Purchases.find()
			.populate('software')
			.populate('unit')
			.exec(function(err, objs) {
				if(err) {
					reject(err);
				}
				resolve(objs);
 			});
	});
}

export function getPurchase(id) {
	return getOne(Purchases, id);
}

export function getWithFilter(filter){
	if(filter == ""){
		return getAllPurchases();
	}
	return new Promise(function(resolve, reject) {
		Purchases.find()
				 .populate('software')
				 .populate('unit')
				 .exec(function(err, prcs) {
				 	if(err) {
				 		reject(err);
				 	} else {
				 		resolve(filterObjects(prcs, filter));
				 	}
				 });
	});
}

export function getPivot(filter) {
	let year = filter.year;
	let unitId = filter.unitId;
	if(!year) {
		if(!unitId){
			// no filter
			return getAllPurchases();
		}
		// Just by Unit
		return getPurchaseByUnit(unitId);
	}
	return new Promise(function(resolve, reject) {
		Purchases.find()
				 .populate('software')
				 .populate('unit')
				 .exec(function(err, prcs) {
				 	if(err) {
				 		reject(err);
				 	} else {
				 		resolve(pivotFilter(prcs, filter));
				 	}
				 });
	})
}

function pivotFilter(prcs, filter){
	let year = filter.year;
	let unitId = filter.unitId;
	prcs = JSON.parse(JSON.stringify(prcs));
	let filteredPrcs = [];

	for(let i=0; i<prcs.length; i++) {
		let purchase = prcs[i];
		for(let j=0; j<purchase.amounts.length; i++) {
			if(unitId){
				if(purchase.unit._id != unitId){
					break;
				}
			}
			if( purchase.amounts[j].year == year){
				filteredPrcs.push(purchase);
			}
		}
	}
	return filteredPrcs
}

export function getPurchaseBySoftware(software_id) {
	return new Promise(function(resolve, reject) {
		Purchases.find({software : new ObjectId(software_id)})
			.populate('software')
			.populate('unit')
			.exec(function(err, objs) {
				if(err) {
					reject(err);
				}
				console.log(objs);
				resolve(objs);
		});
	});
}

export function getPurchaseByUnit(unit_id) {
	return new Promise(function(resolve, reject) {
		Purchases.find({unit : new ObjectId(unit_id)})
			.populate('software')
			.populate('unit')
			.exec(function(err, objs) {
				if(err) {
					reject(err);
				}
				console.log(objs);
				resolve(objs);
		});
	});
}

function filterByUnitName(purchases, unitName: string) {
	purchases = JSON.parse(JSON.stringify(purchases));
	let filteredPrcs = [];
	for(let i = 0; i< purchases.length; i++) {
		let purchase = purchases[i];
		if(purchase.unit.unitId == unitName) {
			filteredPrcs.push(purchase);
		}
	}
	return filteredPrcs;
}

export function getPurchaseByUnitName(unitName: string) {
	return new Promise(function(resolve, reject) {
		Purchases.find()
			.populate('software')
			.populate('unit')
			.exec(function(err, objs) {
				if(err) {
					reject(err);
				}
				// console.log(objs);
				resolve(filterByUnitName(objs, unitName));
		});
	});
}

export function deletePurchasesBySoftware(software_id) {
	return new Promise(function(resolve, reject) {
		Purchases.remove({software : new ObjectId(software_id)}, function(err, obj){
			if(err) {
				reject(err);
			}
			resolve(obj);
		})
	})
}

export function deletePurchasesByUnit(unit_id) {
	return new Promise(function(resolve, reject) {
		Purchases.remove({unit : new ObjectId(unit_id)}, function(err, obj){
			if(err) {
				reject(err);
			}
			resolve(obj);
		})
	})
}

export function addPurchase(purchase) {
	return new Promise(function(resolve, reject) {
		Purchases.create(purchase, function(err, prc) {
			if(err) {
				reject(err);
			}
			prc.populate('software').populate('unit', function(err) {
				if(err) {
					reject(err);
					console.log(err);
				}
				resolve(prc);
			})		
		})
	})
}

export function removePurchase(id) {
	return remove(Purchases, id);
}

export function updatePurchase(purchase) {
	return updateField(Purchases, purchase, "amounts");
}


export function updateField(db, object, field_name) {
	return new Promise(function(resolve, reject) {
		db.findByIdAndUpdate(
			object._id,
			{ $set: {"amounts": object[field_name]} },
			{ new: true })
		   .populate('software')
		   .exec(function(err, obj) {
				if(err) {
					reject(err);
				}
				resolve(obj);
			})
	})