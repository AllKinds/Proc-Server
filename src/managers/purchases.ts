import { getAll, getOne, getByField, add, remove, update} from '../managers/templateManager';

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

export function getPurchaseBySoftware(software_id) {
	return new Promise(function(resolve, reject) {
		Purchases.find({software : new ObjectId(software_id)}, function(err,obj){
			if(err) {
				reject(err);
			}
			console.log(obj);
			resolve(obj);
		});
	});
}

export function getPurchaseByUnit(unit_id) {
	return new Promise(function(resolve, reject) {
		Purchases.find({unit : new ObjectId(unit_id)}, function(err,obj){
			if(err) {
				reject(err);
			}
			console.log(obj);
			resolve(obj);
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
	return update(Purchases, purchase);
}