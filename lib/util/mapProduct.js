'use strict';

var pick = require('lodash.pick');

/**
 * Maps the product conforming to the segment spec to a product in the format that Marin wants.
 *
 * @param {Object} product The product conforming to the segment spec.
 *
 * @return {Object} The object in the format of
 */
module.exports = function(product) {
  var pickedObject = pick(product, ['convType', 'name', 'price', 'category', 'quantity', 'order_id']);

  // map map segment 'name' to Marin 'product'
  pickedObject.product = pickedObject.name;
  delete pickedObject.name;

  // orderId is optional for Marin
  var orderId = product.order_id;
  if (orderId) {
    pickedObject.orderId = orderId;
    delete pickedObject.order_id;
  }

  return pickedObject;
};
