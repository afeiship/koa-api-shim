import $http from './koa-request';

export default class {
  constructor(inApp) {
    this.$app = inApp;
    this.$http = $http;
    this.$method = inApp.method;
  }
  *doJob() {
  }
}
