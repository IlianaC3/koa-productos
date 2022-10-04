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
const frontR = router({
  prefix: ''
});

const FrontClass = require('../controllers/REST/Front')
const PublicAuth  = require('../controllers/authController');
const publicAuthorization = new PublicAuth();
const FrontController = new FrontClass();

frontR.get('/', publicAuthorization.publicAuthorization, FrontController.Home);

frontR.get('/agregar', publicAuthorization.publicAuthorization, FrontController.Agregar);
frontR.get('/editar/:id', publicAuthorization.publicAuthorization, FrontController.Editar);

// FAKER //
frontR.get('/productos-test', publicAuthorization.publicAuthorization, FrontController.ProductosTest);

// LOGIN //
frontR.get('/login', FrontController.LoginFront)
frontR.get('/logout', FrontController.Logout)

//REGISTRO
frontR.get('/signup', FrontController.SignupFront)


module.exports = frontR;
