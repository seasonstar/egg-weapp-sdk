'use strict';

const co = require('co');
const config = require('../config');
const promisify = require('es6-promisify');
const send = promisify(require('request').get, { multiArgs: true });
const WXBizDataCrypt = require('./WXBizDataCrypt');

const _buildUrl = jscode => {
  const apiUrl = 'https://api.weixin.qq.com/sns/jscode2session';
  const appId = config.getAppId();
  const appSecret = config.getAppSecret();
  const params = `?appid=${appId}&secret=${appSecret}&js_code=${jscode}&grant_type=authorization_code`;
  return `${apiUrl}${params}`;
};

// 获取解密SessionKey
const getSessionKey = co.wrap(function* (jscode) {
  try {
    const requestUrl = _buildUrl(jscode);
    const [ response, body ] = yield send({ url: requestUrl, json: true });

    // body: { session_key, expires_in, openid }
    if ('session_key' in body) {
      return { sessionKey: body.session_key, openId: body.openid };
    }

    const error = new Error('jscode failed to exchange session_key');
    throw error;

  } catch (error) {
    throw error;
  }
});


// 解密
const decrypt = co.wrap(function* (sessionKey, encryptedData, iv) {
  try {
    const appId = config.getAppId();
    const pc = new WXBizDataCrypt(appId, sessionKey);
    const data = pc.decryptData(encryptedData, iv);
    return data;
  } catch (e) {
    console.log(e);
    return {
      code: 1,
      msg: e,
    };
  }
});

module.exports = {
  getSessionKey,
  decrypt,
};
