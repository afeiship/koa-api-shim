import $http from './koa-request';

export default class BaseResponder{
  constructor(inApp){
    this.$app=inApp;
    this.$http=$http;
    this.$method = inApp.method;
  }
  *doJob(){
  }
}
