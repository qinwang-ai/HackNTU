'use strict';
var koa = require('koa');
var render = require('koa-ejs');
var middlewares = require('koa-middlewares');
var router = require('koa-router')();

var path = require('path');
var data = require('./data');

// init
var app = koa();

// ejs render
render(app, {
    root: path.join(__dirname, './public'),
    debug: true,
    cache: false,
    layout: false,
    viewExt: 'ejs'
});

// body parse
app.use(middlewares.bodyParser({
  limit: '10mb'
}));

// debug url
app.use(function* (next) {
    console.log(this.request.url);
    yield next;
});

// route
var routes = [
    ['/index.html', 'index', data.index],
    ['/index', 'index', data.index],
    ['/', 'index', data.index],
    ['/RunningBit', 'RunningBit'],
    ['/SlowShutter', 'SlowShutter'],
    ['/Nuggets', 'Nuggets'],
    ['/FacePay', 'FacePay']
];
routes.forEach(function (obj) {
    router.get(obj[0], function *() {
        if(obj[2]) {
            yield this.render(obj[1], obj[2]);
        } else {
            yield this.render(obj[1]);
        }
    });
});

router.get('/FacePay/:id', function* () {
    yield this.render('/FacePayDetail', {
        id: this.params.id
    });
});
router.get('/SlowShutter/:id', function* () {
    yield this.render('/SlowShutterDetail', {
        id: this.params.id
    });
});

app.use(router.routes());

// static cache
app.use(middlewares.staticCache(path.join(__dirname, './public')), {
    buffer: false
});

app.listen(8000);