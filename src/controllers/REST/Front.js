const logger = require('../../operations/logger')
const Productos = require('../../services/Productos');
const FakerProducts = require('../../services/Faker')
const koa = require('koa') 
const views = require('koa-views')
const Producto = new Productos();
const FakerP = new FakerProducts();
const path = require("path");


const app = new koa();

const render = views('../../../public', {map: {
	ejs: 'ejs'
}
});

console.log(render);

  
// Must be used before any router is used
app.use(render)

class FrontClass {
	//Controllers de Front
	async Home(ctx, next) {
		logger.info('Ingresa a ruta home')
		Producto.getAll().then((result) => {
			let info = {
				result: result,
				name: ctx.user
			}
			if (result !== undefined) {
				ctx.render('index', { data: info});
			} else {
				ctx.body = {
					error: `No existen productos`
				};
			}
		});
	};

	async Agregar(ctx, next) {
		logger.info('Ingresa a ruta agrear')
		ctx.render('agregar');
	};

	async Editar(ctx, next) {
		logger.info('Ingresa a ruta editar')
		Producto.getById(ctx.params.id).then((result) => {
			if (result !== undefined) {
				if (result === null) {
					ctx.body = {
						error: `Producto no encontrado para el id ${id}`
					};
				} else {
					ctx.render('editar', { data: result });
				}
			} else {
				ctx.body = {
					error: `El archivo no se puede leer`
				};
			}
		});
	};

	// FAKER //
	async ProductosTest(ctx, next) {
		logger.info('Ingresa a ruta productos-test')
		FakerP.FakerFunction().then((result) => {
			if (result !== undefined) {
				ctx.render('productos-test', { data: result });
			} else {
				ctx.body = {
					error: `No existen productos`
				};
			}
		});	
	};

	// LOGIN //
	async LoginFront(ctx, next) {
		logger.info('Ingresa a ruta login')
		const person = ctx.user;
		if (person) {
			ctx.redirect('/')
		} else {
			await ctx.render('login', {});
		}
	};

	async Logout(ctx, next) {
		logger.info('Ingresa a ruta logout')
		let nombre = ctx.user
		ctx.logout(function(err) {
			if (err) { return next(err); }
			ctx.render('logout', { data: nombre } );
		});
	};

	//REGISTRO
	async SignupFront(ctx, next) {
		logger.info('Ingresa a ruta signup')
		ctx.render('signup');
	};
}


module.exports = FrontClass