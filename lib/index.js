var integration = require('@segment/analytics.js-integration');

var Marin = module.exports = integration('Marin')
    .option('clientTrackingId', '');

Marin.prototype.loaded = function() {
    return false; //TODO
};

Marin.prototype.track = function(track) {
    var event = track.event();
    var properties = track.properties();

    //track event
};
