///<reference path="../../typings/index.d.ts"/>

import * as mongoose from 'mongoose';

export interface AmountOfYear {
	year:	number;
	amount:	number;
}

let Schema = mongoose.Schema;

export interface IPurchase extends mongoose.Document {
	software: 	mongoose.Types.ObjectId;
	unit:		mongoose.Types.ObjectId;
	amounts:	AmountOfYear[];
};

export const PurchaseSchema = new mongoose.Schema({
	software: {
		type: mongoose.Types.ObjectId,
		required: true,
		ref: 'Software'
	},
	unit: {
		type: mongoose.Types.ObjectId,
		required: true,
		ref: 'Unit'
	},
	amounts: Array
});

export let Purchase = mongoose.model<IPurchase>('Software', PurchaseSchema);