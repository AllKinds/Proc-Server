export function getAll(db) {
	return new Promise(function(resolve, reject) {
		db.find()
			.exec(function(err, objs) {
				if(err) {
					reject(err);
				}
				resolve(objs);
 			});
	})
}

export function getOne(id, db) {
	return new Promise(function(resolve, reject) {
		db.findById(id)
			.exec(function(err, obj) {
				if(err) {
					reject(err);
				}
				resolve(obj);
			})
	})
}

export function add(db,object) {
	return new Promise(function(resolve, reject) {
		db.create(object, function(err, obj) {
			if(err) {
				reject(err);
			}
			resolve(obj);
		})
	})
}


export function remove(db, id) {
	return new Promise(function(resolve, reject) {
		db.remove({_id: id}, function(err, obj){
			if(err) {
				reject(err);
			}
			resolve(obj);
		})
	})
}