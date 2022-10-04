const koa = require('koa') 
const render = require("koa-ejs");
const path = require("path");

const app = new koa();
render(app, {
  root: path.join(__dirname, "public"),
  layout: "",
  viewExt: "ejs",
  cache: false,
  debug: true,
});

const router = require('koa-router');
const userR = router({
  prefix: '/api/user'
});

const passport = require('passport');
const UsuariosClass = require('../controllers/REST/Usuarios');
const UsuariosController = new UsuariosClass();

userR.post('/login', passport.authenticate('authentication'), UsuariosController.Login)

userR.post('/signup', passport.authenticate('registration'), UsuariosController.Signup)

module.exports = userR