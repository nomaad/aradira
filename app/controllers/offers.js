'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Offer = mongoose.model('Offer'),
	_ = require('lodash');

/**
 * Create an offer
 */
exports.create = function(req, res) {
	var offer = new Offer(req.body);
	offer.user = req.user;
    //console.log(offer);

	offer.save(function(err) {
		if (err) {
            console.log(err);
			return res.send('users/signup', {
				errors: err.errors,
				offer: offer
			});
		} else {
			res.jsonp(offer);
		}
	});
};

/**
 * Show the current offer
 */
exports.read = function(req, res) {
	res.jsonp(req.offer);
};

/**
 * Update an offer
 */
exports.update = function(req, res) {
	var offer = req.offer;

	offer = _.extend(offer, req.body);

	offer.save(function(err) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(offer);
		}
	});
};

/**
 * Delete an offer
 */
exports.delete = function(req, res) {
	var offer = req.offer;

    offer.remove(function(err) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(offer);
		}
	});
};

/**
 * List of offers
 */
exports.list = function(req, res) {
    //console.log(req.query);
    var params = {};
    if(req.query.lon && req.query.lat) {
        params = {
            position: {
                $nearSphere: [ req.query.lon , req.query.lat ],
                $maxDistance: req.query.dist ? req.query.dist / 6371 : 100 / 6371
            }
        };
    }

    Offer.find(params).sort('-created').populate('user', 'displayName').exec(function(err, offers) {
		if (err) {
            console.log(err);
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(offers);
		}
	});
};

/**
 * Offer middleware
 */
exports.offerByID = function(req, res, next, id) {
    Offer.load(id, function(err, offer) {
		if (err) return next(err);
		if (!offer) return next(new Error('Failed to load offer ' + id));
		req.offer = offer;
		next();
	});
};

/**
 * Offer authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.offer.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};