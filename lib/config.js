'use strict';

const conf = {
  AppId: '',
  AppSecret: '',
  Redis: null,
};

exports = options => {
  options || (options = {});

  Object.keys(options).forEach(key => {
    const value = options[key];

    if (key in conf && typeof value === typeof conf[key]) {
      conf[key] = value;
    }
  });
};

Object.keys(conf).forEach(key => {
  // 获取配置项
  exports[`get${key}`] = () => {
    const value = conf[key];

    if (typeof value === 'string' && !value) {
      throw new Error(`\`${key}\`不能为空，请确保 SDK 配置已正确初始化`);
    }

    return value;
  };

  // 设定配置项
  exports[`set${key}`] = val => {
    conf[key] = val;
  };
});

module.exports = exports;
