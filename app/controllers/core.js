'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    _ = require('lodash'),
    geocode = require('node-geocoder').getGeocoder('google', 'http', {language:'de'});

exports.index = function(req, res) {
	res.render('index.html', {
		user: req.user || null
	});
};

exports.geocode = function(req, res) {
    geocode.geocode(req.body.query, function(err, data) {
        if (err || !data || data.length === 0) {
            console.log(err);
            res.render('error', {
                status: 500
            });
        } else {
            //console.log(data);
            res.jsonp(data[0]);
        }
    });
};

exports.reverseGeocode = function(req, res) {
    geocode.reverse(req.body.lat, req.body.lon, function(err, data) {
        if (err || !data || data.length === 0) {
            console.log(err);
            res.render('error', {
                status: 500
            });
        } else {
            //console.log(data);
            res.jsonp(data[0]);
        }
    });
};