'use strict';

var Analytics = require('@astronomerio/analytics.js-core').constructor;
var integration = require('@astronomerio/analytics.js-integration');
var sandbox = require('@segment/clear-env');
var tester = require('@segment/analytics.js-integration-tester');
var Marin = require('../lib/');
var mapProduct = require('../lib/util/mapProduct');

var segmentProduct = {
  order_id: 'orderId',
  convType : 'gold membership',
  name : 'Membership Gold',
  price : '4.99',
  category : 'memberships',
  quantity : '1'
};

var expectedProduct = {
  orderId: 'orderId',
  convType : 'gold membership',
  product : 'Membership Gold',
  price : '4.99',
  category : 'memberships',
  quantity : '1'
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

      it('should call order completed', function() {
        analytics.stub(marin, '_processOrders');
        analytics.track('Order Completed', {
          products: [segmentProduct]
        });

        analytics.called(window._mTrack.push, [
          'addTrans', { 
            currency: 'USD', 
            items: [expectedProduct]
          }]);

        analytics.called(marin._processOrders);
      });

      it('should process orders', function() {
        var scriptCount = document.getElementsByTagName('script').length;
        marin._processOrders();
        analytics.called(window._mTrack.push, ['processOrders']);
        var newScriptCount = document.getElementsByTagName('script').length;
        analytics.equal(scriptCount + 1, newScriptCount);
      });
    });
  });

  it('should map product to marin format', function() {
    var marinProduct = mapProduct(segmentProduct);
    analytics.deepEqual(marinProduct, expectedProduct);
  });
});
