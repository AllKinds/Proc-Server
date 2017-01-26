import * as mongoose from 'mongoose';

export type Permissions =
		"Basic"
	|	"Unit"
	|	"Manager"
	|	"Admin"


export class IUser {
	id: string;
	// firstName: string;
	// lastName: string;
	name: string;
	permission: Permissions;
	authCode: string;
	unitId: string;

	constructor(id:string, name:string, permission?: Permissions, unitId?: string){
		this.id = id;
		this.name = name;
		this.permission = permission? permission : "Basic";
		this.authCode = "V3ry5ecuredC0de";
		if(unitId) { 
			this.unitId = unitId;
		}else {
			this.unitId = "586c9d4ea31bdc0957621782";
		}
	}

	updateUnit(unitId: string) {
		this.unitId = unitId;
	}
}

export const UserSchema = new mongoose.Schema({
	id: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	permission: {
		type: Object,
		default: "Basic"
	},
	authCode: {
		type: String,

	},
	unitId: {
		type: String,
		default: ""
	}
});

export let User = mongoose.model<IUser>('User', UserSchema)