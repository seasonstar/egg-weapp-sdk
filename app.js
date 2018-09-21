'use strict';

const weapp = require('./lib/index');
const assert = require('assert');

module.exports = app => {
  const config = app.config.weappSDK;
  // 用以支持多redis数据库
  const name = config.name;
  const redis = name ? app.redis.get(name) : app.redis;
  assert(redis, `redis instance [${name}] not exists`);

  weapp.config({
    AppId: config.appId,
    AppSecret: config.appSecret,
    Redis: redis,
  });

  app.weapp = weapp;

  app.coreLogger.info('[当前 SDK 使用配置] =>', config);
  app.coreLogger.info('read data ok');

};
