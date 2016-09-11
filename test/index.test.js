var Analytics = require('@segment/analytics.js-core').constructor;
var integration = require('@segment/analytics.js-integration');
var sandbox = require('@segment/clear-env');
var tester = require('@segment/analytics.js-integration-tester');
var Marin = require('../lib/');

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
