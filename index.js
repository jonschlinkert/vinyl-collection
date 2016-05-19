/*!
 * vinyl-collections (https://github.com/jonschlinkert/vinyl-collections)
 *
 * Copyright (c) 2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var debug = require('debug')('vinyl-collections');

module.exports = function(config) {
  return function(app) {
    if (this.isRegistered('vinyl-collections')) return;
    debug('initializing "%s", from "%s"', __filename, module.parent.id);

    this.define('collections', function() {
      debug('running collections');
      
    });
  };
};
