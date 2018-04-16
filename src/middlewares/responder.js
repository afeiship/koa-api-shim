import fs from 'fs';
import path from 'path';
import config from '../config.json';
const FAVICON = '/favicon.ico';

class Responder {

  static responderCache = {};
  static responderInstance = null;
  static loadResponderInstance(inApp) {
    if (inApp.url !== FAVICON) {
      let ResponderClass = Responder.responderCache[filePath];
      const filePath = path.join(process.cwd(), `/src/responders/${inApp.parameters.name}-responder.js`);
      if (!ResponderClass) {
        if (!fs.existsSync(filePath)) {
          return inApp.status = 404;
        } else {
          ResponderClass = require(filePath).default;
        }
      }
    }
    //TODO:to be optimize:
    Responder.responderInstance = new ResponderClass(inApp);
  }

  static * resolveResponse(inApp) {
    let parameters = inApp.parameters;
    if (parameters) {
      try {
        inApp.body = yield Responder.responderInstance.doJob() || '';
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
