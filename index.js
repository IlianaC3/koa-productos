//Config Inicial
require('dotenv').config();
const http = require('http');
const cluster = require('cluster');
// const express = require('express');
const koa = require('koa');
const os = require('os');
const app = new koa();
const server = http.createServer(app.callback());
const cookieParser = require('koa-cookie-parser');
const passport = require('./src/operations/passport')
const graphQlRouter = require('./src/routes/router_graph')
const koaBody = require('koa-body');
const KoaSesson = require('koa-session')

//Websocket
const { Server: IOServer } = require("socket.io");
const ioController = require('./src/controllers/socketController');
const ioCont = new ioController();
const ioServer = new IOServer(server);
ioServer.on("connection", async (socket) => ioCont.websocketController(socket, ioServer));

//PUERTO
const minimist = require('minimist');
const minimistArg = minimist(process.argv, { alias: {'p': 'port'}});
const port = minimistArg.port || process.env.PORT || 3000;
const mode = process.env.MODE || 'FORK';

//Configuracion PID
const numeroCpus = os.cpus().length;
const processId = process.pid;
const isMaster = cluster.isMaster;

app.use(koaBody())
app.use(cookieParser({
   cookieNameList:['productos','0000-ABDC-0000'],
   cipherKey:"protego",
   maxAge:600000
}));

app.keys = [process.env.SECRET_KEY,'test'];

//SESSION
app.use(KoaSesson({
   key: process.env.SECRET_KEY,
   maxAge: 600000,
   beforeSave() {
       this.maxAge = 600000;
   },
}, app))

let session
app.use(function(ctx, next) {
  ctx.session = session = {
    regenerate(done) {
      for (const key of Object.keys(session)) {
        if (key === process.env.SECRET_KEY) {
          continue
        }
        delete session[key]
      }
      ctx.session.save = function(done) {
        process.nextTick(done)
      }
      process.nextTick(done)
    }
  }
  return next()
})

app.use(passport.initialize());
app.use(passport.session());

app.use(graphQlRouter.routes());

const routes_user = require('./src/routes/routes_user');
app.use(routes_user.routes());

const routes_info = require('./src/routes/routes_info');
app.use(routes_info.routes())

const routes_back = require('./src/routes/routes_back');
app.use(routes_back.routes());

const routes_faker = require('./src/routes/routes_faker');
app.use(routes_faker.routes());

const routes_front = require('./src/routes/routes_front');
app.use(routes_front.routes());

if (cluster.isMaster && mode === 'CLUSTER') {
   for (let i = 0; i < numeroCpus; i++) {
     cluster.fork();
   }
   cluster.on('exit', (worker) => {
     console.log(`Proceso worker con PID ${worker.process.pid} salio`);
   });
} else {
   server.listen(port, () => {
      console.log(`Servidor express - Puerto ${port} - PID ${processId} - Fecha y hora ${(new Date().toLocaleString())}`);
   });
}