'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var offers = require('../../app/controllers/offers');

	// Offer Routes
	app.get('/offers', offers.list);
	app.post('/offers', users.requiresLogin, offers.create);
	app.get('/offers/:offerId', offers.read);
	app.put('/offers/:offerId', users.requiresLogin, offers.hasAuthorization, offers.update);
	app.del('/offers/:offerId', users.requiresLogin, offers.hasAuthorization, offers.delete);

	// Finish by binding the offer middleware
	app.param('offerId', offers.offerByID);
};