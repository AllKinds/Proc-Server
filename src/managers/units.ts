import { getAll, getOne, add, remove} from '../managers/templateManager';

var UnitDb = require('../models/unit');
var Units = UnitDb.Unit;

export function getAllUnits() {
	return getAll(Units)
}

export function getUnit(id) {
	return getOne(Units, id);
}

export function addUnit(object) {
	return add(Units, object);
}

export function removeUnit(id) {
	return remove(Units, id);
}