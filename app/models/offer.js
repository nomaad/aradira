'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
    geocoder = require('node-geocoder').getGeocoder('google', 'http', {language:'de'});


/**
 * Offer Schema
 */
var OfferSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	title: {
		type: String,
		default: '',
		trim: true
	},
	description: {
		type: String,
		default: '',
		trim: true
	},
    address: {
        type: String,
        default: '',
        trim: true
    },
    position: { type : [Number], index: '2d' },
    geoInfo: Schema.Types.Mixed,
    width: Number,
    height: Number,
    communal: {
        type: Boolean,
        default: false
    },
    slots: {
        type: Number,
        default: 1
    },
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

/**
 * Validations
 */
OfferSchema.path('title').validate(function(title) {
	return title.length;
}, 'Bitte einen Titel angeben.');

OfferSchema.path('description').validate(function(description) {
    return description.length;
}, 'Bitte eine Beschreibung angeben.');

OfferSchema.path('address').validate(function(address) {
    return address.length;
}, 'Bitte eine Adresse angeben.');

OfferSchema.path('width').validate(function(width) {
    return width && width > 0;
}, 'Bitte eine ungefähre Breite der Gartenfläche angeben.');

OfferSchema.path('height').validate(function(height) {
    return height && height > 0;
}, 'Bitte eine ungefähre Länge der Gartenfläche angeben.');

OfferSchema.path('slots').validate(function(slots) {
    return slots && slots < 11 && slots > 0;
}, 'Bitte für die Anzahl Gärtner eine Zahl zwischen 1 und 10 eingeben.');


/**
 * Statics
 */
OfferSchema.statics = {
	load: function(id, cb) {
		this.findOne({
			_id: id
		}).populate('user', 'displayName').exec(cb);
	}
};

/**
 * Middleware
 */
OfferSchema.pre('save', function (next) {
    var doc = this;
    geocoder.geocode(this.address, function(err, res) {
        if(err) {
            next(err);
        }
        else {
            if(res && res.length > 0) {
                //console.log(res[0]);
                doc.position = [parseFloat(res[0].longitude), parseFloat(res[0].latitude)];
                doc.geoInfo = res[0];
                next();
            }
            next(new Error('Adresse nicht gefunden'));
        }
    });
});

/**
 * Indexes
 */
//OfferSchema.index({ position : '2d'});

mongoose.model('Offer', OfferSchema);