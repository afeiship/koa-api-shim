
import url from 'url';
import fs from 'fs';
import path from 'path';

class Business {
  static handlerCache ={};
  constructor(inApp){
    this._app = inApp;
    this._handlerClass = null;
  }
  loadHandlerClass(){
    let config = this._app.config;
    let responderName = 'IndexResponder';
    let filePath = path.join('../responders/', responderName + '.js');
    let HandlerClass;

    console.log('fs.existsSync(filePath):->',fs.existsSync(filePath));
    if (!fs.existsSync(filePath)) {
      return this.status = 404;
    } else {
      HandlerClass = require(filePath);
      Business.handlerCache[responderName] = this._handlerClass = new HandlerClass(this._app);
    }
  }
  *resolveResponse(){
    let app = this._app;
    try {
      app.body = yield this._handlerClass.initial() || '';
    } catch (_) {
      app.status = 500;
    }
  }
}

export default function () {
  return function * (next) {
    let business = new Business(this);
    business.loadHandlerClass();
    yield business.resolveResponse();
    yield next;
  };
};
