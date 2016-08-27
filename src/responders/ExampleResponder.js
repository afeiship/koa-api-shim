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
    console.log(this._app.parameters);
    return JSON.stringify(this._app.parameters);
  }
}
