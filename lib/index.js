'use strict';

var integration = require('@segment/analytics.js-integration');
var mapProduct = require('./util/mapProduct');

/**
 * Expose `Marin`.
 */
var Marin = module.exports = integration('Marin')
  .global('_mTrack')
  .option('clientTrackingId', '');

/**
 * Initialize.
 *
 * @api public
 */

Marin.prototype.initialize = function() {
  window._mTrack = window._mTrack || [];
  this.ready();
};

/**
 * Loaded.
 *
 * @api private
 * @return {boolean}
 */

Marin.prototype.loaded = function() {
  return !!(document.body && window._mTrack);
};

/**
 * Page.
 *
 * @api public
 * @param {Page} page
 */
Marin.prototype.page = function() {
  window._mTrack.push(['trackPage']);
  var mClientId = this.options.clientTrackingId;
  var mProto = document.location.protocol === 'https:' ? 'https://' : 'http://';
  var mHost = 'tracker.marinsm.com';
  var mt = document.createElement('script'); 
  mt.type = 'text/javascript'; 
  mt.async = true; 
  mt.src = mProto + mHost + '/tracker/async/' + mClientId + '.js';
  var fscr = document.getElementsByTagName('script')[0];
  fscr.parentNode.insertBefore(mt, fscr);
};

Marin.prototype.track = function(track) {
  var segmentProducts = track.products();
  var marinProducts = segmentProducts.map(function(product) {
    return mapProduct(product); 
  });

  window._mTrack.push(['addTrans', {
    currency: track.currency(),
    items : marinProducts
  }]);

  this._processOrders();
};

Marin.prototype._processOrders = function() {
  _mTrack.push(['processOrders']);
  var mClientId = this.options.clientTrackingId;
  var mProto = document.location.protocol === 'https:' ? 'https://' : 'http://';
  var mHost = 'tracker.marinsm.com';
  var mt = document.createElement('script');
  mt.type = 'text/javascript';
  mt.async = true;
  mt.src = mProto + mHost + '/tracker/async/' + mClientId + '.js';
  var fscr = document.getElementsByTagName('script')[0];
  fscr.parentNode.insertBefore(mt, fscr);
};
