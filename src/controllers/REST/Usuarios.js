const logger = require('../../operations/logger')
const Productos = require('../../services/Productos');
const FakerProducts = require('../../services/Faker')
const koa = require('koa') 
const views = require('koa-views')
const Producto = new Productos();
const FakerP = new FakerProducts();

// const render = require("koa-ejs");
const path = require("path");
// console.log(path);


const app = new koa();
// const renderA = render(app, {
//   root: path.join(__dirname, "public"),
//   layout: "template",
//   viewExt: "ejs",
//   cache: false,
//   debug: true,
// });
// console.log(__dirname)

const render = views('../../../public', {map: {
	ejs: 'ejs'
}
});

  
// Must be used before any router is used
app.use(render)


class UsuariosClass {
    async Login(ctx, next) {
        logger.info('Autorización login')
        let msg = '';
        if(ctx.user.email === -1) {
           msg = 'Usuario no existe';
           ctx.logout(function(err) {
              if (err) { return next(err); }
              res.render('error', {data: msg});
           });
        } else if (ctx.user.email === 0) {
           msg = 'Contraseña incorrecta';
           ctx.logout(function(err) {
              if (err) { return next(err); }
              ctx.render('error', {data: msg});
           });
        } else {
          console.log("aqui esta el problema") 
           ctx.redirect('/');
        }
     };
     
     async Signup(ctx, next) {
        logger.info('Resgistro usuario')
        let msg = '';
        if(ctx.user.data === -1) {
           msg = 'No se pudo crear el usuario'
           ctx.logout(function(err) {
              if (err) { return next(err); }
              ctx.render('error', {data: msg});
            });
        } else if (ctx.user.data === 0) {
           msg = 'Usuario ya existe'
           ctx.logout(function(err) {
              if (err) { return next(err); }
              ctx.render('error', { data: msg });
           });
        } else {
           // console.log(req.user)
           msg = ctx.user.data;
           ctx.logout(function(err) {
              if (err) { return next(err); }
              ctx.render('success', { data: msg });
           })
        }
     };
    
}

 module.exports = UsuariosClass