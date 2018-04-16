import path from 'path';
import url from 'url';
import config from 'root/config.json';

class Bootstrap {
  static getParameters(inApp) {
    let urlObj, name;
    let result = null;
    const originalUrl = inApp.originalUrl;
    if (originalUrl.indexOf(config.disguiseSuffix) > -1) {
      urlObj = url.parse(originalUrl, true);
      name = path.basename(urlObj.pathname, config.disguiseSuffix);
      return {
        query: urlObj.query,
        name: name
      };
    }
  }
}

export default function() {
  return function*(next) {
    var parameters = Bootstrap.getParameters(this);
    this.parameters = parameters;
    yield next;
  };
};
