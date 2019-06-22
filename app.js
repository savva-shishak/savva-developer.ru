const Koa = require('koa');
const app = new Koa();
const serve = require('koa-static')

const router = require('./router')

app
    .use(router.routes())
    .use(router.allowedMethods())
    .use(serve('./client'));

app.listen(1180, () => {
    console.log('work');
});