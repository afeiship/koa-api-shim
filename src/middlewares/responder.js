import fs from 'fs';
import path from 'path';
import config from '../config.json';

class Responder {
  static responderCache = {};
  static responderInstance = null;
  static getFilePath(inApp) {
    let parameters = inApp.parameters;
    let responderName = `${parameters.name.charAt(0).toUpperCase()}${parameters.name.slice(1)}Responder`;
    let filePath = path.join(process.cwd(), '/src/responders/', responderName + '.js');
    return filePath;
  }
  static loadResponderInstance(inApp) {
    let filePath = Responder.getFilePath(inApp);
    let ResponderClass = Responder.responderCache[filePath];
    if (!ResponderClass) {
      if (!fs.existsSync(filePath)) {
        return inApp.status = 404;
      } else {
        ResponderClass = require(filePath).default;
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

export default function() {
  return function*(next) {
    Responder.loadResponderInstance(this);
    yield Responder.resolveResponse(this);
    yield next;
  };
};
