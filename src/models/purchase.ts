///<reference path="../../typings/index.d.ts"/>

import * as mongoose from 'mongoose';

export interface AmountByYear {
	year:	number;
	amount:	number;
}

let Schema = mongoose.Schema;

export interface IPurchase extends mongoose.Document {
	softwareId: 	number;
	unitId: 		number;
	subUnit: 		string;
	amounts: 		AmountByYear[];
};

export const PurchaseSchema = new mongoose.Schema({
	softwareId: {
		type: Number,
		required: true
	},
	unitId: {
		type: Number,
		required: true
	},
	subUnit: {
		type: String,
		required: true
	},
	amounts: Array
});

export let Purchase = mongoose.model<IPurchase>('Purchase', PurchaseSchema);