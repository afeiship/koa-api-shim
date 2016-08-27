
import url from 'url';
import fs from 'fs';
import path from 'path';

let __responder;
class Responder {
  static responderCache = {};
  static getResponder(inResponderClass,inApp){
    if(!__responder){
      __responder=new inResponderClass(inApp);
    }
    return __responder;
  }
  constructor(inApp){
    this._app = inApp;
    this._responderClass = null;
  }
  loadResponderClass(){
    let config = this._app.config;
    let responderName = 'IndexResponder';
    let filePath = path.join(process.cwd(),'/src/responders/', responderName + '.js');
    let ResponderClass=Responder.responderCache[filePath];
    if(!ResponderClass){
      if (!fs.existsSync(filePath)) {
        return this.status = 404;
      } else {
        ResponderClass = require(filePath).default;
      }
    }
    this._responderClass = Responder.getResponder(ResponderClass,this._app);
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
