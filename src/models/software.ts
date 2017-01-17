///<reference path="../../typings/index.d.ts"/>

import * as mongoose from 'mongoose';

export interface PriceByYear {
	year: 	number;
	price: 	number;
}

export interface ISoftware extends mongoose.Document {
	softwareId: 	string;
	softwareName: 	string;
	publisherName: 	string;
	pricesByYear:	Array<PriceByYear>;
	type?: 			string;
	info?: 			string;
	licenceCost: 	number;
	supportCost?: 	number;
	updateCost?: 	number;
};

export const SoftwareSchema = new mongoose.Schema({
	softwareId: {
		type: String,
		required: true
	},
	softwareName: {
		type: String,
		required: true
	},
	publisherName: {
		type: String,
		required: true
	},
	pricesByYear: Array,
	type: String,
	info: String,
	licenceCost: {
		type: Number,
		required: true
	},
	supportCost: Number,
	updateCost: Number
});

export let Software = mongoose.model<ISoftware>('Software', SoftwareSchema);