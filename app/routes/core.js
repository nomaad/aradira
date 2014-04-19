'use strict';

module.exports = function(app) {
	// Root routing
	var core = require('../../app/controllers/core');
	app.get('/', core.index);
    app.post('/reverse-geocode', core.reverseGeocode);
    app.post('/geocode', core.geocode);
};