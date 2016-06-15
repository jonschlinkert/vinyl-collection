/*!
 * vinyl-collections (https://github.com/jonschlinkert/vinyl-collections)
 *
 * Copyright (c) 2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var Base = require('base');
var debug = require('debug')('vinyl:collections');
var utils = require('./lib/utils');
var init = require('./lib/init');

/**
 * Create a new `Collection` with the given `options`.
 *
 * ```js
 * var collection = new Collection();
 * ```
 * @param {Object} `options`
 * @api public
 */

function Collection(options) {
  if (!(this instanceof Collection)) {
    return new Collection(options);
  }

  Base.call(this, {}, options);
  this.is('Collection');

  this.define('File', this.options.File || utils.File);
  this.files = {};

  this.use(utils.plugin());
  this.use(utils.option());
  this.use(utils.data());
  init(this);
}

/**
 * Inherit `Base`
 */

Base.extend(Collection);

/**
 * Create a vinyl `file`.
 *
 * ```js
 * var file = collection.file('foo', {path: 'a/b/c.js'});
 * ```
 * @param {String|Object} `key` Optionally define a `key` to use if the file will be cached.
 * @param {Object} `file` Object or instance of [vinyl][].
 * @return {Object}
 * @api public
 */

Collection.prototype.file = function(key, file) {
  if (utils.isObject(key)) {
    file = key;
    key = file.path;
  }

  if (typeof file === 'string') {
    file = { contents: file };
  }

  if (utils.isBuffer(file)) {
    file = { contents: file };
  }

  if (typeof key === 'string' && !file) {
    file = { key: key };
    file.contents = null;
  }

  if (typeof file.path === 'undefined') {
    file.path = file.key;
  }

  if (typeof file.contents === 'string') {
    file.contents = new Buffer(file.contents);
  }

  if (!this.isFile(file)) {
    file = new this.File(file);
  }

  file.isFile = true;
  file.key = this.renameKey(key, file);
  return file;
};

/**
 * Add a `file` to the collection.
 *
 * ```js
 * collection.addFile('foo', {path: 'a/b/c.js'});
 * ```
 * @param {String|Object} `key` Either the `key` to use for caching the file, or a [vinyl][] `file` object
 * @param {Object} `file` Object or instance of `Vinyl`
 * @return {Object} Returns the instance for chaining
 * @api public
 */

Collection.prototype.addFile = function(key, file) {
  var file = this.file.apply(this, arguments);
  this.emit('file', file);
  this.files[file.key] = file;
  return this;
};

/**
 * Add an object or array of `files` to the collection.
 *
 * ```js
 * collection.addFiles(files);
 * ```
 * @param {Array|Object} `files`
 * @return {Object} Returns the instance for chaining
 * @api public
 */

Collection.prototype.addFiles = function(files) {
  if (this.isFile(files)) {
    return this.addFile.apply(this, arguments);
  }

  if (Array.isArray(files)) {
    files.forEach(function(file) {
      this.addFile(file);
    }.bind(this));
    return;
  }

  for (var key in files) {
    this.addFile(key, files[key]);
  }
  return this;
};

/**
 * Get a file from the collection.
 *
 * ```js
 * var file = collection.getFile('foo');
 * ```
 * @param {String|Object} `key` The key of the file to get. If `key` is a `file` object it is returned.
 * @return {Object} Returns the `file` if found
 * @api public
 */

Collection.prototype.getFile = function(key) {
  if (!this.isFile(key)) {
    var file = this.files[key] || this.files[this.renameKey(key)];
    if (typeof file === 'undefined') {
      for (var prop in this.files) {
        if (this.files.hasOwnProperty(prop)) {
          var val = this.files[prop];
          if (val.path === key) {
            return val;
          }
          if (val.relative === key) {
            return val;
          }
          if (val.basename === key) {
            return val;
          }
          if (val.stem === key) {
            return val;
          }
        }
      }
    }
    return file;
  }
  return key;
};

/**
 * Rename the `key` on the given file. If `options.renameKey` is a function,
 * it will be used to rename the key, otherwise, the key is not modified.
 * This is used to ensure that file keys are consistently named using user-defined
 * preferences.
 *
 * ```js
 * collection.renameKey('foo');
 * ```
 * @param {String} `key`
 * @param {Object} `file`
 * @return {Boolean}
 */

Collection.prototype.renameKey = function(key, file) {
  return typeof this.options.renameKey === 'function'
    ? this.options.renameKey.call(this, key, file)
    : key;
};

/**
 * Returns true if `file` is a collection `file` object.
 *
 * ```js
 * console.log(collection.isFile('foo'));
 * //=> false
 *
 * console.log(collection.isFile(new Vinyl({path: 'foo'})));
 * //=> false
 *
 * console.log(collection.isFile(collection.file({path: 'foo'})));
 * //=> true
 * ```
 * @param {Object} `file`
 * @return {Boolean}
 * @api public
 */

Collection.prototype.isFile = function(file) {
  return Collection.isFile(file);
};

/**
 * Static method, returns true if `file` is a collection `file` object.
 *
 * ```js
 * console.log(Collection.isFile('foo'));
 * //=> false
 *
 * console.log(Collection.isFile(new Vinyl({path: 'foo'})));
 * //=> false
 *
 * console.log(Collection.isFile(collection.file({path: 'foo'})));
 * //=> true
 * ```
 * @param {Object} `file`
 * @return {Boolean}
 * @api public
 */

Collection.isFile = function(file) {
  return utils.isObject(file) && file.isFile;
};

/**
 * Expose `Collection`
 */

module.exports = Collection;
