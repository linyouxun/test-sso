
import Router from 'koa-router';
import fs from 'fs';
import path from 'path';
import {saveUser, getUser, findUserOne} from '../comment/Models/User';
const router = new Router();
const token_path = path.resolve() + '/token_user.json';
router.get('/', (ctx, next) => {
    let session = ctx.session;
    console.log(ctx.session);
    let info = 'info: '
    if (!!session) {
      info += JSON.stringify(session);
    }
     let form = `<form action="./login" method="post">
        <input name='name' placeholder='用户名'/><br/>
        <input name='pwd' placeholder='密码'/>
        <button type='submit'>Submit</button>
     </form>`;
    ctx.body = render(form + info);
});

router.post('login', async (ctx, next) => {
  let {name,pwd} = ctx.request.body;
  ctx.session = {}
  if (!name) {
    return ctx.body = {
      code: 400,
      msg: '用户名不能为空'
    }
  }

  if (!pwd) {
    return ctx.body = {
      code: 400,
      msg: '密码不能为空'
    }
  }
  let d = await findUserOne({name,password:pwd});
  if (!d) {
    return ctx.body = {
      code: 400,
      msg: '没有找到该用户'
    }
  }
  ctx.session = d;
  return ctx.body = {
    code: 400,
    user: d,
  }

});


router.get('register', async (ctx, next) => {
  let form = `<form action="./register" method="post">
     <input name='name' placeholder='用户名'/><br/>
     <input name='pwd' placeholder='密码'/>
     <button type='submit'>register</button>
  </form>`;
  return ctx.body = form;
});

router.post('register',async (ctx, next) => {
  let {name,pwd} = ctx.request.body;
  if (!name) {
    return ctx.body = {
      code: 400,
      msg: '用户名不能为空'
    }
  }

  if (!pwd) {
    return ctx.body = {
      code: 400,
      msg: '密码不能为空'
    }
  }
  let d = await getUser({name});
  if (d.length > 0) {
    return ctx.body = {
      code: 400,
      msg: '用户名已被注册'
    }
  }
  let data = await saveUser({
    name,
    password:pwd
  });
  ctx.body = {
    data
  };
});

router.get('*', (ctx, next) => {
    ctx.body = render(ctx.url);
});

function render(html) {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0">
      <title>My App</title>
    <body>
      <div id="app">${html}</div>
  </html>`;
}

export default router;