var integration = require('@segment/analytics.js-integration');

var Marin = module.exports = integration('Marin')
.global('_mTrack')
.option('clientTrackingId', '');

Marin.prototype.page = function () {
    var _mTrack = _mTrack || [];
    _mTrack.push(['trackPage']);
    var mClientId = this.options.clientTrackingId;
    var mProto = ('https:' == document.location.protocol ? 'https://' : 'http://');
    var mHost = 'tracker.marinsm.com';
    var mt = document.createElement('script'); mt.type = 'text/javascript'; mt.async = true; mt.src = mProto + mHost +
        '/tracker/async/' + mClientId + '.js';
    var fscr = document.getElementsByTagName('script')[0]; fscr.parentNode.insertBefore(mt, fscr);
}

Marin.prototype.track = function(track) {
    var event = track.event();
    var properties = track.properties();

    //track event
};
