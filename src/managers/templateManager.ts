export function getAll(db) {
	return new Promise(function(resolve, reject) {
		db.find()
			.exec(function(err, objs) {
				if(err) {
					reject(err);
				} else {
					resolve(objs);
				}
 			});
	})
}

export function getOne(db, id) {
	return new Promise(function(resolve, reject) {
		db.findById(id)
			.exec(function(err, obj) {
				if(err) {
					reject(err);
				} else {
					resolve(obj);
				}
			})
	})
}

export function getByField(db, field_name, field_value) {
	return new Promise(function(resolve, reject) {
		db.find({field_name:`${field_value}`}, function(err,obj){
			if(err) {
				reject(err);
			} else {
				resolve(obj);
			}
		});
	});
}

export function add(db,object) {
	return new Promise(function(resolve, reject) {
		db.create(object, function(err, obj) {
			if(err) {
				reject(err);
			} else {
				resolve(obj);
			}
		})
	})
}


export function remove(db, id) {
	return new Promise(function(resolve, reject) {
		db.remove({_id: id}, function(err, obj){
			if(err) {
				reject(err);
			} else {
				resolve(obj);
			}
		})
	})
}

export function update(db, object) {
	return new Promise(function(resolve, reject) {
		object.save(function(err, obj) {
			if(err) {
				reject(err);
			} else {
				resolve(obj);
			}
		})
	})
}



function concatObjVals(obj, withPrivate) {
	let valueString = '';
	for(let key in obj) {
		if(key[0] == '_' && !withPrivate){
			continue;
		}
		if(typeof(obj[key]) == "object"){
			valueString += concatObjVals(obj[key], withPrivate);
		} else {
			valueString += obj[key] + "; ";
		}
	}
	return valueString;
}

export function filterObjects(objs, filter){
	objs = JSON.parse(JSON.stringify(objs));
	if(!filter) {
		return objs;
	}
	let filteredObjs = [];
	for (let i=0; i<objs.length; i++) {
	    let obj = objs[i];
		if(isFiltered(obj, filter)) {
			filteredObjs.push(obj);
		}
	}
	return filteredObjs;
}

function isFiltered(obj, filter): boolean {
	if(!filter) {
		return true;
	}
	let valueString = concatObjVals(obj, false);
	return valueString.includes(filter);
}