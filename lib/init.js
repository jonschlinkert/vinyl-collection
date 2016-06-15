'use strict';

var utils = require('./utils');

module.exports = function(app) {
  app.cache = app.cache || {};
  app.cache.data = app.cache.data || {};
  app.cache.context = app.cache.context || {};

  if (!app._) utils.define(app, '_', {});

  if (!app._.engines) {
    app._.engines = {};
  }

  if (!app._.helpers) {
    app._.helpers = {
      async: {},
      sync: {}
    };
  }

  if (!app.viewTypes) {
    app.viewTypes = {
      layout: [],
      partial: [],
      renderable: []
    };
  }
};
