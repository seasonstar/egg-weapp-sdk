'use strict';

const co = require('co');
const config = require('../config');
const constants = require('./constants');
const AuthAPIError = require('./auth-api-error');
const jscode2session = require('../helper/jscode2session');
const uuid = require('../helper/uuid');

const ONE_MONTH = 1000 * 60 * 60 * 24 * 30;

module.exports = {
  login: co.wrap(function* (code, encrypt_data, iv) {
    const session = yield jscode2session.getSessionKey(code);
    const data = yield jscode2session.decrypt(session.sessionKey, encrypt_data, iv);
    const redis = config.getRedis();
    const token = uuid();
    yield redis.set(token, data, ONE_MONTH);
    return {
      id: token,
      skey: 'bravo',
      user_info: data,
    };
  }),

  checkLogin: co.wrap(function* (id, skey) {
    if (skey !== 'bravo') {
      const error = new AuthAPIError(constants.RETURN_CODE_WX_SESSION_FAILED, constants.ERR_LOGIN_FAILED);
      throw error;

    }
    const redis = config.getRedis();
    const user_info = yield redis.get(id);
    return { user_info };
  }),

};
