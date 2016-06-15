'use strict';

var utils = require('lazy-cache')(require);
var fn = require;
require = utils;

/**
 * Lazily required module dependencies
 */

require('base-data', 'data');
require('base-option', 'option');
require('base-plugins', 'plugin');
require('define-property', 'define');
require('engine-base', 'engine');
require('isobject', 'isObject');
require('is-buffer');
require('mixin-deep', 'merge');
require('vinyl', 'File');
require = fn;

utils.formatExt = function(ext) {
  if (ext.charAt(0) !== '.') {
    return '.' + ext;
  }
  return ext;
};

/**
 * Expose `utils` modules
 */

module.exports = utils;
