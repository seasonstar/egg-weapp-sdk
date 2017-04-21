# egg-weapp-sdk

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-weapp-sdk.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-weapp-sdk
[travis-image]: https://img.shields.io/travis/eggjs/egg-weapp-sdk.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-weapp-sdk
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-weapp-sdk.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-weapp-sdk?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-weapp-sdk.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-weapp-sdk
[snyk-image]: https://snyk.io/test/npm/egg-weapp-sdk/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-weapp-sdk
[download-image]: https://img.shields.io/npm/dm/egg-weapp-sdk.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-weapp-sdk

可移步[中文文档](README.zh_CN.md)

## Dependencies

- egg-redis

- [qcloud-weapp-client-sdk](https://github.com/tencentyun/weapp-client-sdk)

 Egg-weapp-sdk should be interacted with qcloud-weapp-client-sdk in Weapp Client

## Demo

> [egg-24time](https://github.com/seasonstar/egg-24time)

Server [Egg，Mysql，Redis, ES6]

> [weapp-24time](https://github.com/seasonstar/weapp-24time)

Weapp Client


## Install

```bash
$ npm i egg-weapp-sdk --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.redis = {
  enable: true,
  package: 'egg-redis',
};

exports.weappSDK = {
  enable: true,
  package: 'egg-weapp-sdk',
};
```

## Configuration

```js
// {app_root}/config/config.default.js

module.exports = appInfo => {
  const config = {};

  config.redis = {
    client: {
      host: '127.0.0.1',
      port: '6379',
      password: '',
      db: '0',
    },
  };

  // replace your appId and appSecret of WEAPP
  config.weappSDK = {
    appId: 'xxxxxxxxxxx',
    appSecret: 'xxxxxxxxxxxxxxxxxx',
  };

  return config;
};
```

- Why and What: Manage weapp user session independently, use Redis to store session.

see [config/config.default.js](config/config.default.js) for more detail.

- Two methods:

1. Login:  loginService.login()

2. Check:  loginService.check()

## Example

<!-- example here -->

```js
// app/controller/weapp.js
module.exports = app => {
  class WeappController extends app.Controller {
    * login() {
      const { ctx, app } = this;
      const loginService = app.weapp.LoginService.create(ctx.request, ctx.response);
      yield loginService.login()
        .then(data => {
          ctx.body = data;
        });
    }

    * user() {
      const { ctx, app } = this;
      const loginService = app.weapp.LoginService.create(ctx.request, ctx.response);
      yield loginService.check()
        .then(data => {
          ctx.body = {
            code: 0,
            message: 'ok',
            data: {
              userInfo: data.userInfo,
            },
          };
        });
    }
  }
  return WeappController;
};
```

## Credits && Inspiration

[腾讯云微信小程序客户端 SDK](https://github.com/tencentyun/weapp-client-sdk)


## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)
