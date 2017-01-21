"use strict";
// import { getAll, getOne, add, remove} from '../managers/templateManager';
var sMngr = require("../managers/softwares");
module.exports = function (app) {
    var SoftwareDb = require('../models/software');
    var Softwares = SoftwareDb.Software;
    var middlewares = require('../middlewares');
    // Functions
    function validateSoftware(soft) {
        return true;
    }
    function validateSoftwareId(req, res, next) {
        if (!req.params.software_id) {
            res.send("Error: Parameter 'software_id' is undefined");
        }
        next();
    }
    function updatePriceOfYear(softwareId, priceByYear, res) {
        sMngr.getSoftware(softwareId).then(function (software) {
            var validPbY = (priceByYear.price >= 0);
            if (!software.pricesByYear) {
                // if not defined yet - initialize it.
                software.pricesByYear = [];
            }
            for (var i = 0; i <= software.pricesByYear.length; i++) {
                if (i == software.pricesByYear.length) {
                    // Insert Last
                    software.pricesByYear.push(priceByYear);
                    break;
                }
                var year = software.pricesByYear[i].year;
                if (year == priceByYear.year) {
                    // Update year
                    if (priceByYear.price < 0) {
                        // Remove price of year
                        software.pricesByYear.splice(i, 1);
                        validPbY = true;
                    }
                    else {
                        software.pricesByYear[i] = priceByYear;
                    }
                    break;
                }
                if (year > priceByYear.year) {
                    // Insert Between
                    software.pricesByYear.splice(i, 0, priceByYear);
                    break;
                }
            }
            if (!validPbY) {
                res.send("Price is not a valid numebr");
                return;
            }
            sMngr.updateSoftware(software).then(function (sft) {
                res.json(sft);
            }).catch(function (err) {
                res.send(err);
                console.log(err);
            });
        }).catch(function (err) {
            res.send(err);
            console.log(err);
        });
    }
    // Requests
    // GET all Softwares
    app.get('/api/softwares', middlewares.requireLogin, function (req, res) {
        sMngr.getAllSoftwares().then(function (result) {
            res.json(result);
        }).catch(function (err) {
            res.send(err);
            console.error(err);
        });
    });
    // GET a Software by ID
    app.get('/api/software/:software_id', middlewares.requireLogin, function (req, res) {
        var id = req.params.software_id;
        sMngr.getSoftware(id).then(function (soft) {
            res.json(soft);
        }).catch(function (err) {
            res.send(err);
            console.log(err);
        });
    });
    // POST a Software
    app.post('/api/software', middlewares.requireLogin, function (req, res) {
        var software = {
            softwareId: req.body.softwareId,
            softwareName: req.body.softwareName,
            publisherName: req.body.publisherName,
            licenceCost: req.body.licenceCost
        };
        if (validateSoftware(software)) {
            sMngr.addSoftware(software).then(function (soft) {
                res.json(soft);
            }).catch(function (err) {
                res.send(err);
                console.log(err);
            });
        }
        else {
            console.error("Error : The software model is incorrect");
            res.status(500).send('Error : The software model is incorrect');
        }
    });
    // DELETE a Software by ID
    app.delete('/api/software/:software_id', middlewares.canEditSoft, function (req, res) {
        var id = req.params.software_id;
        if (!id) {
            res.send("Error: Parameter software_id is undefined");
        }
        sMngr.removeSoftware(id).then(function (soft) {
            res.json(id);
        }).catch(function (err) {
            console.log(err);
            res.send(err);
        });
    });
    app.put('/api/software/updateYearPrice/:software_id', function (req, res) {
        var id = req.params.software_id;
        var priceOfYear = req.body.priceOfYear;
        updatePriceOfYear(id, priceOfYear, res);
    });
};

//# sourceMappingURL=../../build/api/softwares.js.map
