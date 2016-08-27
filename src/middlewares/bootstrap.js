import path from 'path';
import url from 'url';
import config from '../config.json';

class Bootstrap {
  static getParameters(inApp){
    let originalUrl = inApp.originalUrl;
    let urlObj,name;
    let result = null;
    if(originalUrl.indexOf(config.disguiseSuffix)>-1){
      urlObj= url.parse(inApp.originalUrl,true);
      name = path.basename(urlObj.pathname,config.disguiseSuffix);
      return {
        query:urlObj.query,
        name:name
      };
    }
  }
  constructor(inApp) {
    this._app = inApp;
    inApp.parameters = Bootstrap.getParameters(inApp);
  }
}

export default function (inConfig) {
  return function * (next) {
    new Bootstrap(this,inConfig);
    yield next;
  };
};
