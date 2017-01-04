///<reference path="../../typings/index.d.ts"/>

import * as mongoose from 'mongoose';


export interface AmountByYear {
	year:	number;
	amount:	number;
}

let Schema = mongoose.Schema;

export interface IPurchase extends mongoose.Document {
	software: 	any;
	unit:		any;
	amounts: 	AmountByYear[];
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
	amounts: Array
});

export let Purchase = mongoose.model<IPurchase>('Purchase', PurchaseSchema);