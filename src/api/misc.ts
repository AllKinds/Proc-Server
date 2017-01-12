import { User } from '../models/user';

module.exports = function(app) {
	app.get('/api/user/:type', function(req, res) {
		let type = req.params.type;
		res.json(new User("123", "Avi Ron", type));
	});
};