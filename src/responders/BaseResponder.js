import $http from '../core/koa-request';

export default class BaseResponder{
  constructor(inApp){
    this._app=inApp;
    this.$http=$http;
  }
  *doJob(){
  }
  doGET(inUrl,inOptions){
  }
  doPOST(inUrl,inOptions){
  }
}
