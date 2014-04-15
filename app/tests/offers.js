'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Offer = mongoose.model('Offer');

//Globals
var user;
var offer;

//The tests
describe('<Unit Test>', function() {
	describe('Model Offer:', function() {
		beforeEach(function(done) {
			user = new User({
				firstName: 'Full',
				lastName: 'Name',
				displayName: 'Full Name',
				email: 'test@test.com',
				username: 'username',
				password: 'password'
			});

			user.save(function() {
				offer = new Offer({
					title: 'Rosengarten',
					description: 'Der Rosengarten wird bepflanzt.',
                    address: 'Alter Aargauerstalden 31, Bern, Schweiz',
                    position: [46.9513552, 7.4610718],
                    width: 1,
                    height: 3,
                    communal: true,
                    slots: 10,
					user: user
				});

				done();
			});
		});

		describe('Method Save', function() {
			it('should be able to save without problems', function(done) {
				return offer.save(function(err) {
					should.not.exist(err);
					done();
				});
			});

			it('should be able to show an error when try to save without title', function(done) {
				offer.title = '';

				return offer.save(function(err) {
					should.exist(err);
					done();
				});
			});

            it('should be able to show an error when try to save without description', function(done) {
                offer.title = 'Rosengarten';
                offer.description = '';

                return offer.save(function(err) {
                    should.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save without address', function(done) {
                offer.description = 'Der Rosengarten wird bepflanzt.';
                offer.address = '';

                return offer.save(function(err) {
                    should.exist(err);
                    done();
                });
            });

            it('should be able to geocode position from address', function(done) {
                offer.position = null;
                offer.address = 'Alter Aargauerstalden 31, Bern, Schweiz';

                return offer.save(function(err) {
                    should(offer.position[0]).eql(46.9513552);
                    should(offer.position[1]).eql(7.4610718);
                    done();
                });
            });

            it('should throw an error when address does not exist', function(done) {
                offer.position = null;
                offer.address = 'Foobarstrasse 42, Yadayada, Schweiz';

                return offer.save(function(err) {
                    should.exist(err);
                    should(offer.position).eql(null);
                    done();
                });
            });
		});

        it('should be able to show an error when try to save without width', function(done) {
            offer.address = 'Alter Aargauerstalden 31, Bern, Schweiz';
            offer.width = null;

            return offer.save(function(err) {
                should.exist(err);
                done();
            });
        });

        it('should be able to show an error when try to save without height', function(done) {
            offer.width = 1;
            offer.height = null;

            return offer.save(function(err) {
                should.exist(err);
                done();
            });
        });

        it('should be able to show an error when more than 10 communal slots are defined', function(done) {
            offer.height = 3;
            offer.slots = 11;

            return offer.save(function(err) {
                should.exist(err);
                done();
            });
        });

		afterEach(function(done) {
			Offer.remove().exec();
			User.remove().exec();
			done();
		});
	});
});