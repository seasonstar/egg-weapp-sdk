'use strict';

const weapp = require('./lib/index');

module.exports = app => {
  const config = app.config.weappSDK;

  weapp.config({
    AppId: config.appId,
    AppSecret: config.appSecret,
    Redis: app.redis,
  });

  app.weapp = weapp;

  app.coreLogger.info('[当前 SDK 使用配置] =>', config);
  app.coreLogger.info('read data ok');

};
