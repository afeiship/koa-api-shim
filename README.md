# koa-api-shim
Nodejs shim use koa framework to call backend api.( koa1 )


## resources:
+ https://github.com/dionoid/koa-request
+ https://cnodejs.org/topic/56460e0d89b4b49902e7fbd3
+ https://segmentfault.com/q/1010000004280608
+ http://www.cnblogs.com/diligenceday/p/5453523.html
+ http://babeldev.dan.cx/docs/setup/#gulp
+ https://github.com/dionoid/koa-request/blob/master/index.js
+ http://blog.csdn.net/qiqingjin/article/details/51921331
+ https://github.com/typicode/json-server
+ https://babeljs.io/repl/
+ https://h3manth.com/new/blog/2015/es6-reflect-api/

## nginx_proxy:
```conf
location ~* \.php {
  proxy_pass 	http://127.0.0.1:9091;
}
```

## get-start:
+ npm run serve
+ http://localhost:8081/example.php?id=123&cd=123&token=tst1sfd`2234
```json
{
  "query": {
    "id": "123",
    "cd": "123",
    "token": "tst1sfd`2234"
  },
  "name": "example"
}
```
+ http://localhost:8081/index.php
```json
{
  "query": {},
  "name": "index"
}
```
