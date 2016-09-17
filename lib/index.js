'use strict';

var integration = require('@segment/analytics.js-integration');

var Marin = module.exports = integration('Marin')
.global('_mTrack')
.option('clientTrackingId', '');

Marin.prototype.page = function() {
  window._mTrack = window._mTrack || [];
  window._mTrack.push(['trackPage']);
  var mClientId = this.options.clientTrackingId;
  var mProto = document.location.protocol === 'https:' ? 'https://' : 'http://';
  var mHost = 'tracker.marinsm.com';
  var mt = document.createElement('script'); 
  mt.type = 'text/javascript'; 
  mt.async = true; 
  mt.src = mProto + mHost + '/tracker/async/' + mClientId + '.js';
  var fscr = document.getElementsByTagName('script')[0]; fscr.parentNode.insertBefore(mt, fscr);
};

/**
 * Marin sample conversion call.
 var _mTrack = _mTrack || [];
 _mTrack.push(['addTrans', {
currency :'<ISO-CURRENCY-CODE>',
items : [
{
orderId : '<ORDER-ID>',
convType : '<CONV-TYPE-ID>',
product : '<PRODUCT-SKU/NAME>',
price : '<PRICE>',
category : '<CATEGORY>',
quantity : '<QUANTITY>'
}
]
}]);
_mTrack.push(['processOrders']);
var mClientId = '[CLIENT-TRACKING-ID]';
var mProto = ('https:' == document.location.protocol ? 'https://' : 'http://');
var mHost = 'tracker.marinsm.com';
var mt = document.createElement('script'); mt.type = 'text/javascript'; mt.async = true; mt.src =
mProto + mHost + '/tracker/async/' + mClientId + '.js';
var fscr = document.getElementsByTagName('script')[0]; fscr.parentNode.insertBefore(mt, fscr);
*/

Marin.prototype.track = function(track) {
  var event = track.event();
  var products = track.products();
};

