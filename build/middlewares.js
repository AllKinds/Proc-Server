"use strict";
module.exports.requireLogin = function (req, res, next) {
    req.user = {
        "firstName": "Avi",
        "lastName": "Ron",
        "uniqeId": "1234",
        "prms": "Admin",
        "unit": "586c9d4ea31bdc0957621782"
    };
    if (req.user) {
        next();
    }
    else {
        res.redirect(403, '/login');
    }
};
module.exports.authUser = function (req, res, next) {
    if (req.user && req.user.authCode == "V3ry5ecuredC0de") {
        next();
    }
    res.status(401);
};
module.exports.canEditSoft = function (req, res, next) {
    next();
};
module.exports.isManager = function (req, res, next) {
    if (req.user && req.user.permission in ['Manager', 'Admin']) {
        next();
    }
    res.status(401);
};
module.exports.eladTest = function (req, res, next) {
    console.log("nitrothejello");
    next();
};
module.exports.allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    next();
};

//# sourceMappingURL=../build/middlewares.js.map
