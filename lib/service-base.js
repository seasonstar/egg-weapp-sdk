'use strict';

class ServiceBase {
  constructor(req, res) {
    Object.assign(this, { req, res });
  }

  static create(req, res) {
    return new this(req, res);
  }

  writeJsonResult(obj, statusCode) {
    statusCode || (statusCode = 200);

    this.res.status = statusCode;
    this.res.body = obj;

  }

  getHeader(headerKey) {
    const key = String(headerKey).toLowerCase();
    return this.req.headers[key] || '';
  }
}

module.exports = ServiceBase;
