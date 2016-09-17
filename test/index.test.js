'use strict';

var Analytics = require('@segment/analytics.js-core').constructor;
var integration = require('@segment/analytics.js-integration');
var sandbox = require('@segment/clear-env');
var tester = require('@segment/analytics.js-integration-tester');
var Marin = require('../lib/');
var mapProduct = require('../lib/util/mapProduct');
var assert = require('assert');

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
    analytics.compare(Marin, integration('Marin'));
  });
});

describe('Map Product', function() {
  var segmentProduct = {
    order_id: 'orderId',
    convType : '<CONV-TYPE-ID>',
    name : '<PRODUCT-SKU/NAME>',
    price : '<PRICE>',
    category : '<CATEGORY>',
    quantity : '<QUANTITY>'
  };

  var marinProduct = mapProduct(segmentProduct);

  var expectedProduct = {
    orderId: 'orderId',
    convType : '<CONV-TYPE-ID>',
    product : '<PRODUCT-SKU/NAME>',
    price : '<PRICE>',
    category : '<CATEGORY>',
    quantity : '<QUANTITY>'
  };

  assert.deepEqual(marinProduct, expectedProduct);
});
