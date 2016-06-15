'use strict';

require('mocha');
var assert = require('assert');
var Collection = require('./');

describe('Collection', function() {
  describe('Collection', function() {
    it('should export a function', function() {
      assert(Collection);
      assert.equal(typeof Collection, 'function');
    });
  });

  describe('collection', function() {
    it('should create an instance of Collection', function() {
      var collection = new Collection();
      assert(collection);
      assert.equal(typeof collection, 'object');
      assert(collection instanceof Collection);
    });
  });
});
