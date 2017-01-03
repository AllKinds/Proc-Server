///<reference path="../../typings/index.d.ts"/>

import * as mongoose from 'mongoose';


export interface AmountByYear {
	year:	number;
	amount:	number;
}

let Schema = mongoose.Schema;

export interface IPurchase extends mongoose.Document {
	software: 	any;
	unitId: 		number;
	subUnit: 		string;
	amounts: 		AmountByYear[];
};

export const PurchaseSchema = new mongoose.Schema({
	software: {
		type: Schema.ObjectId,
		ref:  'Software',
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