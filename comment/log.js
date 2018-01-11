import log4js from 'log4js';

log4js.configure({
  appenders: {
    urlLog: {
      type: "dateFile",
      filename: './log/url',//您要写入日志文件的路径
      alwaysIncludePattern: true,//（默认为false） - 将模式包含在当前日志文件的名称以及备份中
      compress: true,//（默认为false） - 在滚动期间压缩备份文件（备份文件将具有.gz扩展名）
      pattern: "-yyyy-MM-dd.log",//（可选，默认为.yyyy-MM-dd） - 用于确定何时滚动日志的模式。格式:.yyyy-MM-dd-hh:mm:ss.log
      encoding: 'utf-8',//default "utf-8"，文件的编码
    },
    errorLog: {
      type: "dateFile",
      filename: './log/error',//您要写入日志文件的路径
      alwaysIncludePattern: true,//（默认为false） - 将模式包含在当前日志文件的名称以及备份中
      compress: true,//（默认为false） - 在滚动期间压缩备份文件（备份文件将具有.gz扩展名）
      pattern: "-yyyy-MM-dd.log",//（可选，默认为.yyyy-MM-dd） - 用于确定何时滚动日志的模式。格式:.yyyy-MM-dd-hh:mm:ss.log
      encoding: 'utf-8',//default "utf-8"，文件的编码
    },
    console: { type: 'console' }
  },
  categories: {
    default: { appenders: ['urlLog'], level: 'info' },
    logError: { appenders: ['errorLog'], level: 'error' },
  },
  pm2: true,
  pm2InstanceVar: 'INSTANCE_ID'
});

const cLog = log4js.getLogger();

async function logger(ctx, next) {
    const start = Date.now()
    try {
      await next();
      log(ctx, start, null, null);
    } catch (err) {
      log(ctx, start, null, err)
      throw err
    }
}

function time (start) {
    const delta = Date.now() - start
    return delta < 10000 ? delta + 'ms': Math.round(delta / 1000) + 's'
}

function log (ctx, start, err, event) {
    const status = err ? (err.isBoom ? err.output.statusCode : err.status || 500) : (ctx.status || 404)
    cLog.info(ctx.method, ctx.originalUrl, status, time(start));
}

export default logger;
