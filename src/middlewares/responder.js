import fs from 'fs';
import path from 'path';
import config from '../config.json';

let __instance;

class Responder {
  static responderCache = {};
  static getInstance(inResponderClass,inApp){
    if(!__instance){
      __instance=new inResponderClass(inApp);
    }
    return __instance;
  }
  constructor(inApp){
    this._app = inApp;
    this._responderClass = null;
  }
  loadResponderClass(){
    let parameters = this._app.parameters;
    if(parameters){
      let responderName = `${parameters.name.charAt(0).toUpperCase()}${parameters.name.slice(1)}Responder`;
      let filePath = path.join(process.cwd(),'/src/responders/', responderName + '.js');
      console.log(filePath);
      let ResponderClass=Responder.responderCache[filePath];
      if(!ResponderClass){
        if (!fs.existsSync(filePath)) {
          return this._app.status = 404;
        } else {
          ResponderClass = require(filePath).default;
        }
      }
      this._responderClass = Responder.getInstance(ResponderClass,this._app);
    }
  }
  *resolveResponse(){
    let parameters = this._app.parameters;
    if(parameters){
      try {
        this._app.body = yield this._responderClass.doJob() || '';
      } catch (_) {
        this._app.status = 500;
      }
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
