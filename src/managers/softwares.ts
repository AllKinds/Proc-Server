import { getAll, getOne, add, remove, update, filterObjects} from '../managers/templateManager';

var SoftwareDb = require('../models/software');
var Softwares = SoftwareDb.Software;

export function getAllSoftwares() {
	return getAll(Softwares)
}

export function getWithFilter(filter){
	if(filter == ""){
		return getAllSoftwares();
	}
	return new Promise(function(resolve, reject) {
		Softwares.find()
				 .exec(function(err, prcs) {
				 	if(err) {
				 		reject(err);
				 	} else {
				 		resolve(filterObjects(prcs, filter));
				 	}
				 });
	});
}

export function getSoftware(id) {
	return getOne(Softwares, id);
}

export function addSoftware(object) {
	return add(Softwares, object);
}

export function removeSoftware(id) {
	return remove(Softwares, id);
}
export function updateSoftwarePbY(software) {
	return updateField(Softwares, software, 'pricesByYear');
}
export function updateSoftwareProps(software) {
	let field_name = 'properties';
	return new Promise(function(resolve, reject) {
		Softwares.update(
			{_id: software._id},
			{$set: { 'properties': software[field_name] }}, 
			{strict: false}, 
			function(err, obj) {
				if(err) {
					reject(err);
				}
				resolve(obj);
			});
	})
}
export function updateField(db, object, field_name) {
	return new Promise(function(resolve, reject) {
		db.findByIdAndUpdate(
			object._id,
			{ $set: {field_name: object[field_name]} },
			{ new: true },
			function(err, obj) {
				if(err) {
					reject(err);
				}
				resolve(obj);
			})
	})
}

