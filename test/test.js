'use strict';

require('mocha');
var path = require('path');
var assert = require('assert');
var Collection = require('..');
var collection;

describe('Collection', function() {
  describe('constructor', function() {
    it('should export a function', function() {
      assert(Collection);
      assert.equal(typeof Collection, 'function');
    });

    it('should create an instance of Collection', function() {
      collection = new Collection();
      assert(collection);
      assert.equal(typeof collection, 'object');
      assert(collection instanceof Collection);
    });
  });

  describe('.file', function() {
    beforeEach(function() {
      collection = new Collection();
    });

    it('should create a vinyl file', function() {
      var file = collection.file({path: 'foo'});
      assert(file);
      assert.equal(typeof file, 'object');
      assert.equal(typeof file.path, 'string');
      assert.equal(file.path, 'foo');
    });

    it('should add an object to collection.files', function() {
      collection.addFile({path: 'foo'});
      var file = collection.files.foo;
      assert(file);
      assert.equal(typeof file, 'object');
      assert.equal(typeof file.path, 'string');
      assert.equal(file.path, 'foo');
    });

    it('should add a key/value pair to collection.files', function() {
      collection.addFile('foo', {path: 'bar'});
      var file = collection.files.foo;
      assert(file);
      assert.equal(typeof file, 'object');
      assert.equal(typeof file.path, 'string');
      assert.equal(file.path, 'bar');
    });

    it('should add a string to collection.files', function() {
      collection.addFile('foo');
      var file = collection.files.foo;
      assert(file);
      assert.equal(typeof file, 'object');
      assert.equal(typeof file.path, 'string');
      assert.equal(file.path, 'foo');
    });

    it('should add a file object to collection.files', function() {
      var foo = collection.file('foo');
      collection.addFile(foo);
      var file = collection.files.foo;
      assert(file);
      assert.equal(typeof file, 'object');
      assert.equal(typeof file.path, 'string');
      assert.equal(file.path, 'foo');
    });
  });

  describe('.files', function() {
    beforeEach(function() {
      collection = new Collection();
    });

    it('should add an object of objects to collection.files', function() {
      var files = {
        foo: {path: 'foo'},
        bar: {path: 'bar'}
      };

      collection.addFiles(files);
      assert(collection.files.foo);
      assert(collection.files.bar);
      assert.equal(typeof collection.files.foo, 'object');
      assert.equal(typeof collection.files.bar, 'object');
      assert.equal(typeof collection.files.foo.path, 'string');
      assert.equal(typeof collection.files.bar.path, 'string');
      assert.equal(collection.files.foo.path, 'foo');
      assert.equal(collection.files.bar.path, 'bar');
    });

    it('should add an array of objects to collection.files', function() {
      var files = [
        {path: 'foo'},
        {path: 'bar'}
      ];

      collection.addFiles(files);
      assert(collection.files.foo);
      assert(collection.files.bar);
      assert.equal(typeof collection.files.foo, 'object');
      assert.equal(typeof collection.files.bar, 'object');
      assert.equal(typeof collection.files.foo.path, 'string');
      assert.equal(typeof collection.files.bar.path, 'string');
      assert.equal(collection.files.foo.path, 'foo');
      assert.equal(collection.files.bar.path, 'bar');
    });

    it('should add an array of string to collection.files', function() {
      var files = ['foo', 'bar'];

      collection.addFiles(files);
      assert(collection.files.foo);
      assert(collection.files.bar);
      assert.equal(typeof collection.files.foo, 'object');
      assert.equal(typeof collection.files.bar, 'object');
      assert.equal(typeof collection.files.foo.path, 'string');
      assert.equal(typeof collection.files.bar.path, 'string');
      assert.equal(collection.files.foo.path, 'foo');
      assert.equal(collection.files.bar.path, 'bar');
    });

    it('should add an array of file objects to collection.files', function() {
      var files = [collection.file('foo'), collection.file('bar')];

      collection.addFiles(files);
      assert(collection.files.foo);
      assert(collection.files.bar);
      assert.equal(typeof collection.files.foo, 'object');
      assert.equal(typeof collection.files.bar, 'object');
      assert.equal(typeof collection.files.foo.path, 'string');
      assert.equal(typeof collection.files.bar.path, 'string');
      assert.equal(collection.files.foo.path, 'foo');
      assert.equal(collection.files.bar.path, 'bar');
    });
  });

  describe('.getFile', function() {
    beforeEach(function() {
      collection = new Collection();
    });

    it('should get a file', function() {
      collection.addFile({path: 'foo'});
      var file = collection.getFile('foo');
      assert(file);
      assert.equal(typeof file, 'object');
      assert.equal(typeof file.path, 'string');
      assert.equal(file.path, 'foo');
    });

    it('should get a file by basename', function() {
      collection.addFile({path: path.resolve('foo.js')});
      var file = collection.getFile('foo.js');
      assert(file);
      assert.equal(typeof file, 'object');
      assert.equal(typeof file.path, 'string');
      assert.equal(file.path, path.resolve('foo.js'));
    });

    it('should get a file by absolute path', function() {
      collection.addFile({path: path.resolve('foo.js')});
      var file = collection.getFile(path.resolve('foo.js'));
      assert(file);
      assert.equal(typeof file, 'object');
      assert.equal(typeof file.path, 'string');
      assert.equal(file.path, path.resolve('foo.js'));
    });

    it('should get a file by relative path', function() {
      collection.addFile({path: path.resolve('a/b/c/foo.js')});
      var file = collection.getFile('a/b/c/foo.js');
      assert(file);
      assert.equal(typeof file, 'object');
      assert.equal(typeof file.path, 'string');
      assert.equal(file.path, path.resolve('a/b/c/foo.js'));
    });
  });

  describe('.renameKey', function() {
    beforeEach(function() {
      collection = new Collection({
        renameKey: function(key) {
          return path.join('abc', path.basename(key));
        }
      });
    });

    it('should get a file by its renamed key', function() {
      collection.addFile({path: path.resolve('foo.js')});
      var file = collection.getFile('abc/foo.js');
      assert(file);
      assert.equal(typeof file, 'object');
      assert.equal(typeof file.path, 'string');
      assert.equal(file.path, path.resolve('foo.js'));
    });

    it('should file with a renamed key by basename', function() {
      collection.addFile({path: path.resolve('foo.js')});
      var file = collection.getFile('foo.js');
      assert(file);
      assert.equal(typeof file, 'object');
      assert.equal(typeof file.path, 'string');
      assert.equal(file.path, path.resolve('foo.js'));
    });

    it('should get a file with a renamed key by absolute path', function() {
      collection.addFile({path: path.resolve('foo.js')});
      var file = collection.getFile(path.resolve('foo.js'));
      assert(collection.getFile('abc/foo.js'));
      assert(file);
      assert.equal(typeof file, 'object');
      assert.equal(typeof file.path, 'string');
      assert.equal(file.path, path.resolve('foo.js'));
    });

    it('should get a file by relative path', function() {
      collection.addFile({path: path.resolve('a/b/c/foo.js')});
      assert(collection.getFile('abc/foo.js'));
      var file = collection.getFile('a/b/c/foo.js');
      assert(file);
      assert.equal(typeof file, 'object');
      assert.equal(typeof file.path, 'string');
      assert.equal(file.path, path.resolve('a/b/c/foo.js'));
    });
  });
});
