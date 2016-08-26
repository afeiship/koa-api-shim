import Koa from 'koa';
import request from './vendors/koa-request';

let app = Koa();

app.use(function *() {
    let response = yield request('http://home.baidu.com/jobs/jobs.html',{
      headers: { 'User-Agent': 'request by koa' }
    }); //Yay, HTTP requests with no callbacks!
    this.body = response.body;
});

app.listen(process.env.PORT || 8080);

console.log('app start at port:8080...');
