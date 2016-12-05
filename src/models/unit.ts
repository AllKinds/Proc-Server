///<reference path="../../typings/index.d.ts"/>

import * as mongoose from 'mongoose';

export interface IUnit extends mongoose.Document {
	unitId: 		string;
	subUnit: 		string;
	publisherName: 	string;
	type?: 			string;
	info?: 			string;
	licenceCost: 	number;
	supportCost?: 	number;
	updateCost?: 	number;
};

export const UnitSchema = new mongoose.Schema({
	unitId: {
		type: String,
		required: true
	},
	subUnit: String
});

export let Unit = mongoose.model<IUnit>('Unit', UnitSchema);
