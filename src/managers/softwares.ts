import { getAll, getOne, add, remove} from '../managers/templateManager';

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