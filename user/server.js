import path from 'path';
import Koa from 'koa';
import Router from 'koa-router';
import index from './router';
import logger from '../comment/log';
import bodyParser from 'koa-bodyparser';
import session from 'koa-session2';

const app = new Koa();
const router = new Router();
app.keys = ['user', 'name'];
app.use(logger);

app.use(session({
    key: 'token'
}));

app.use(bodyParser());

router.use('/', index.routes());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(6001, (error) => {
    if (error) {
        console.log('start error');
    } else {
        console.log('start http://localhost:6001');
    }
});
