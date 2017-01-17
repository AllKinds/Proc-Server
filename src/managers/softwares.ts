import { getAll, getOne, add, remove, update} from '../managers/templateManager';

var SoftwareDb = require('../models/software');
var Softwares = SoftwareDb.Software;

export function getAllSoftwares() {
	return getAll(Softwares)
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
export function updateSoftware(software) {
	return updateField(Softwares, software, 'pricesByYear');
}

export function updateField(db, object, field_name) {
	return new Promise(function(resolve, reject) {
		db.findByIdAndUpdate(
			object._id,
			{ $set: {"pricesByYear": object[field_name]} },
			{ new: true },
			function(err, obj) {
				if(err) {
					reject(err);
				}
				resolve(obj);
			})
	})
