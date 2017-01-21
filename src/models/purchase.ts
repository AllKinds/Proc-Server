///<reference path="../../typings/index.d.ts"/>

import * as mongoose from 'mongoose';


export interface AmountByYear {
	year:	number;
	amount:	number;
}

let Schema = mongoose.Schema;

export interface IPurchase extends mongoose.Document {
	software: 		any;
	unit:			any;
	amounts: 		AmountByYear[];
	lastUpdated: 	Date;
};

export const PurchaseSchema = new mongoose.Schema({
	software: {
		type: Schema.ObjectId,
		ref:  'Software',
		required: true
	},
	unit: {
		type: Schema.ObjectId,
		ref:  'Unit',
		required: true
	},
	amounts: Array,
	lastUpdated: {
		type: Date,
		default: new Date(1470000000000)
	}
});

export let Purchase = mongoose.model<IPurchase>('Purchase', PurchaseSchema);