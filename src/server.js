import fs from 'fs';
import koa from 'koa';
import url from 'url';
import path from 'path';
import request from 'core/koa-request';
import config from 'root/config.json';

//middlewares:
import bootstrap from 'middlewares/bootstrap';
import responder from 'middlewares/responder';

//initial app:
let app = koa();

//attach middlewares:
app.use(bootstrap());
app.use(responder());
app.listen(config.port);

//show log:
console.log(`app start at http://localhost:${config.port}`);
