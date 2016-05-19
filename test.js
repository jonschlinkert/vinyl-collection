'use strict';

require('mocha');
var assert = require('assert');
var collections = require('./');

describe('vinyl-collections', function() {
  it('should export a function', function() {
    assert.equal(typeof collections, 'function');
  });

  it('should export an object', function() {
    assert(collections);
    assert.equal(typeof collections, 'object');
  });

  it('should throw an error when invalid args are passed', function(cb) {
    try {
      collections();
      cb(new Error('expected an error'));
    } catch (err) {
      assert(err);
      assert.equal(err.message, 'expected first argument to be a string');
      assert.equal(err.message, 'expected callback to be a function');
      cb();
    }
  });
});
