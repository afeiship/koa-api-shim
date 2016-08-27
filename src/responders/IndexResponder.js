import BaseResponder from './BaseResponder';
export default class IndexResponder extends BaseResponder{
  static __instance=null;
  static getInstance (inApp){
    if(!IndexResponder.__instance){
      IndexResponder.__instance = new IndexResponder(inApp);
    }
    return IndexResponder.__instance;
  }
  *doJob(){
    let response = yield this.$http('https://api.github.com/repos/dionoid/koa-request',{
      headers: { 'User-Agent': 'request' }
    });
    let info = JSON.parse(response.body);
    return info.owner;
  }
}
