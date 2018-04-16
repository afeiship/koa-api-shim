import fs from 'fs';
import path from 'path';
import config from 'root/config.json';
const FAVICON = '/favicon.ico';

class Responder {

  static _cache = {};
  static _instance = null;
  static loadResponderInstance(inApp) {
    if (inApp.url !== FAVICON) {
      const filePath = path.join(process.cwd(), `/src/responders/${inApp.parameters.name}-responder.js`);
      let ResponderClass = Responder._cache[filePath];

      if (!ResponderClass) {
        if (!fs.existsSync(filePath)) {
          return inApp.status = 404;
        } else {
          ResponderClass = require(filePath).default;
        }
      }
      Responder._instance = new ResponderClass(inApp);
    }
    return null;
  }

  static * resolveResponse(inApp) {
    let parameters = inApp.parameters;
    if (parameters) {
      try {
        inApp.body = yield Responder._instance.doJob() || '';
      } catch (_) {
        inApp.status = 500;
      }
    }
  }

}

export default function () {
  return function* (next) {
    Responder.loadResponderInstance(this);
    yield Responder.resolveResponse(this);
    yield next;
  };
};
