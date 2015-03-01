
/**
 * Module dependencies.
 */

var responseTime = require('koa-response-time');
var compress = require('koa-compress');
var logger = require('koa-logger');
var staticCache = require('koa-static-cache');
var router = require('koa-router');
var load = require('./lib/load');
var koa = require('koa');
var path = require('path');

/**
 * Environment.
 */

var env = process.env.NODE_ENV || 'development';

/**
 * Expose `api()`.
 */

module.exports = api;

/**
 * Initialize an app with the given `opts`.
 *
 * @param {Object} opts
 * @return {Application}
 * @api public
 */

function api(opts) {
  opts = opts || {};
  var app = koa();

  // logging

  if ('test' != env) app.use(logger());

  // x-response-time

  app.use(responseTime());

  // static server

  if ('development' != env) {
    app.use(staticCache(path.join(__dirname, 'static'), {
      maxAge: 30 * 24 * 60 * 60
    }));
  }
  else {
    app.use(staticCache(path.join(__dirname, 'static'), {
      dynamic: true
    }));
  }

  // compression

  app.use(compress());

  // routing

  app.use(router(app));

  // boot

  load(app, __dirname + '/api');

  return app;
}
