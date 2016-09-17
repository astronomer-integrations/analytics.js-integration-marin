'use strict';

var Analytics = require('@segment/analytics.js-core').constructor;
var integration = require('@segment/analytics.js-integration');
var sandbox = require('@segment/clear-env');
var tester = require('@segment/analytics.js-integration-tester');
var Marin = require('../lib/');
var mapProduct = require('../lib/util/mapProduct');

var segmentProduct = {
  order_id: 'orderId',
  convType : '<CONV-TYPE-ID>',
  name : '<PRODUCT-SKU/NAME>',
  price : '<PRICE>',
  category : '<CATEGORY>',
  quantity : '<QUANTITY>'
};

var expectedProduct = {
  orderId: 'orderId',
  convType : '<CONV-TYPE-ID>',
  product : '<PRODUCT-SKU/NAME>',
  price : '<PRICE>',
  category : '<CATEGORY>',
  quantity : '<QUANTITY>'
};

describe('Marin', function() {
  var analytics;
  var marin;
  var options = {
  };

  beforeEach(function() {
    analytics = new Analytics();
    marin = new Marin(options);
    analytics.use(Marin);
    analytics.use(tester);
    analytics.add(marin);
  });

  afterEach(function() {
    analytics.restore();
    analytics.reset();
    marin.reset();
    sandbox();
  });

  it('should have the correct settings', function() {
    analytics.compare(Marin, integration('Marin')
                      .global('_mTrack')
                      .option('clientTrackingId', ''));
  });

  describe('loading', function() {
    it('should load', function(done) {
      analytics.load(marin, done);
    });
  });

  describe('after loading', function() {
    beforeEach(function(done) {
      analytics.once('ready', done);
      analytics.initialize();
    });

    describe('#page', function() {
      beforeEach(function() {
        analytics.stub(window._mTrack, 'push');
      });

      it('should call page', function() {
        var scriptCount = document.getElementsByTagName('script').length;
        analytics.page();
        analytics.called(window._mTrack.push, ['trackPage']);
        // make sure the integration inserted the script tag
        var newScriptCount = document.getElementsByTagName('script').length;
        analytics.equal(scriptCount + 1, newScriptCount);
      });
    });

    describe('#track', function() {
      beforeEach(function() {
        analytics.stub(window._mTrack, 'push');
      });
    })
  });

  it('should map product to marin format', function() {
    var marinProduct = mapProduct(segmentProduct);
    analytics.deepEqual(marinProduct, expectedProduct);
  });
});
