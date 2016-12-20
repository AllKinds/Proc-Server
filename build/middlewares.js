module.exports.requireLogin = function (req, res, next) {
    next();
};
module.exports.canEditSoft = function (req, res, next) {
    next();
};
module.exports.allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    next();
};

//# sourceMappingURL=../build/middlewares.js.map
