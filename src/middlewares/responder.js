
import url from 'url';
import fs from 'fs';
import path from 'path';

class Responder {
  static responderCache ={};
  constructor(inApp){
    this._app = inApp;
    this._responderClass = null;
  }
  loadResponderClass(){
    let config = this._app.config;
    let responderName = 'IndexResponder';
    let filePath = path.join(process.cwd(),'/src/responders/', responderName + '.js');
    let ResponderClass;
    if (!fs.existsSync(filePath)) {
      return this.status = 404;
    } else {
      ResponderClass = require(filePath).default;
      this._responderClass = ResponderClass.getInstance(this._app);
    }
  }
  *resolveResponse(){
    let app = this._app;
    try {
      app.body = yield this._responderClass.doJob() || '';
    } catch (_) {
      app.status = 500;
    }
  }
}

export default function () {
  return function * (next) {
    let responder = new Responder(this);
    responder.loadResponderClass();
    yield responder.resolveResponse();
    yield next;
  };
};
