///<reference path="../../typings/index.d.ts"/>

import * as mongoose from 'mongoose';

export interface IUnit extends mongoose.Document {
	unitId: 		string;
	subUnit: 		string;
};

export const UnitSchema = new mongoose.Schema({
	unitId: {
		type: String,
		required: true
	},
	subUnit: String
});

export let Unit = mongoose.model<IUnit>('Unit', UnitSchema);
