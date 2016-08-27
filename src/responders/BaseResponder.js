import response from '../core/koa-request';

export default class BaseResponder{
  constructor(inApp){
    this._app=inApp;
  }
  initial(){
  }
  doGET(inUrl,inOptions){
  }
  doPOST(inUrl,inOptions){
  }
}
