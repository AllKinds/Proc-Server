module.exports.requireLogin = function(req, res, next){
	next();
};

module.exports.canEditSoft = function (req, res, next) {
    next();
};

module.exports.eladTest = function(req, res, next){
	console.log("nitrothejello");
	next();
};

module.exports.allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    next();
}