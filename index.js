/*!
 * vinyl-collections (https://github.com/jonschlinkert/vinyl-collections)
 *
 * Copyright (c) 2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var Base = require('base');
var debug = require('debug')('vinyl:collections');
var utils = require('./utils');

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
}

/**
 * Inherit `Base`
 */

Base.extend(Collection);

Collection.isFile = function(file) {
  return utils.isObject(file) && (file.isFile || file._isVinyl);
};

Collection.prototype.isFile = function(file) {
  return Collection.isFile(file) || this.File.isVinyl(file);
};

Collection.prototype.file = function(key, file) {
  if (utils.isObject(key)) {
    file = key;
    key = file.path;
  }

  if (typeof file === 'string') {
    file = { contents: new Buffer(file) };
  }

  if (Buffer.isBuffer(file)) {
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

Collection.prototype.addFile = function(key, file) {
  var file = this.file.apply(this, arguments);
  this.emit('file', file);
  this.files[file.key] = file;
  return this;
};

Collection.prototype.addFiles = function(files) {
  if (Array.isArray(files)) {
    return files.forEach(this.addFile.bind(this));
  }
  for (var key in files) this.addFile(key, files[key]);
  return this;
};

Collection.prototype.getFile = function(key) {
  return this.isFile(key) ? key : (this.files[key] || this.files[this.renameKey(key)]);
};

Collection.prototype.renameKey = function(key, file) {
  return typeof this.options.renameKey === 'function'
    ? this.options.renameKey.call(this, key, file)
    : key;
};

Collection.prototype.engine = function(ext, fn) {
  this.engines[utils.formatExt(ext)] = fn;
  return this;
};

Collection.prototype.render = function(file, locals, cb) {
  if (typeof locals === 'function') {
    cb = locals;
    locals = {};
  }

  file = this.getFile(file);
  var ext = file.extname;
  var engine = this.engines[file.extname] || this.engines.noop;

  if (typeof engine === 'undefined') {
    cb(new Error('cannot find an engine for: ' + ext));
    return;
  }

  var ctx = utils.extend({}, this.cache.data, locals);
  engine.render(file.contents.toString(), ctx, cb);
};

/**
 * Expose `Collection`
 */

module.exports = Collection;
