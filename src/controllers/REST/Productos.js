const Productos = require('../../services/Productos');
const Producto = new Productos();
const logger = require('../../operations/logger')

class ProductosClass {
	async AllProductos(ctx) {
		logger.info('Solicita todos los productos')
		let statusC = 200;
		let resFinal = await Producto.getAll().then(result => {
			if (result !== undefined) {
				// ctx.response.status = 200;
				return {
					err: null,
					message: `Productos`,
					result: result
				}
				// console.log(ctx);
			} else {
				logger.error('No existen productos')
				statusC = 404;
				return {
					err: 404,
					error: `No existen productos`,
				}
			}
		});
		ctx.response.status = statusC;
		ctx.response.body = resFinal
	};
	
	async UnProducto(ctx) {
		logger.info('Solicita un producto')
		// console.log(ctx)
		let id = ctx.params.id;
		// console.log(id);
		let statusC = 200;
		let resFinal = await Producto.getById(id).then(result => {
			if (result !== undefined) {
				if (result === null) {
					logger.error(`No existe el producto ${id}`)
					statusC = 404;
					return {
						err: 404,
						error: `Producto no encontrado para el id ${id}`,
					};
				} else {
					return {
						err: null,
						message: `Producto ID: ${id}`,
						result: result
					};
				}
			} else {
				logger.error(`No se pudo realizar la lectura del producto ${id}`)
				return {
					err: 404,
					error: `El archivo no se puede leer`,
				};
			}
		});
		ctx.response.status = statusC;
		ctx.response.body = resFinal;
	};
	
	async SaveProducto(ctx) {
		logger.info('Crea un producto')
		let statusC = 200;
		let { title, price, thumbnail } = ctx.request.body;
		let dataFinal;
		if (title != '' && price > 0 && thumbnail != '') {
			let nuevoProducto = {
				title,
				price,
				thumbnail
			}
			let resFinal = await Producto.save(nuevoProducto).then(result => {
				// console.log(result)
				if (result !== undefined) {
					return {
						err: null,
						message: `Nuevo producto`,
						result: result
					};
				} else {
					logger.error(`No se pudo crear el producto`);
					statusC = 404;
					return {
						err: 404,
						error: `No se pudo guardar el producto`,
					};
				}
			});
			dataFinal = resFinal;
		} else {
			logger.error(`Datos incompletos al guardar`)
			statusC = 404;
			dataFinal = {
				err: 404,
				error: `Datos incompletos`,
			};
		}
		ctx.response.status = statusC;
		ctx.response.body = dataFinal;
	};
	
	async updateProducto(ctx) {
		logger.info('Edita un producto')
		let id = ctx.params.id;
		let { title, price, thumbnail } = ctx.request.body;
		let dataFinal;
		let statusC = 200;
		if (title != '' && price > 0 && thumbnail != '' && id > 0) {
			let editarProducto = {
				title,
				price,
				thumbnail
			}
			let resFinal = await Producto.updateById(id, editarProducto).then(result => {
				// console.log(result)
				if (result !== undefined) {
					return {
						err: null,
						message: `Editar producto ${id}`,
						result: result
					};
				} else {
					logger.error(`No se pudo editar el producto ${id}`)
					statusC = 404;
					return {
						err: 404,
						error: `No se pudo modificar el producto`,
					};
				}
			});
			dataFinal = resFinal;
		} else {
			logger.error(`Datos incompletos al editar`)
			statusC = 404;
			dataFinal = {
				err: null,
				error: `Datos incompletos`,
			};
		}
		ctx.response.status = statusC;
		ctx.response.body = dataFinal;
	};
	
	async DeleteProducto(ctx) {
		logger.info('Elimina un producto')
		let id = ctx.params.id;
		let statusC = 200;
		let resFinal = await Producto.deleteById(id).then(result => {
			// console.log(result)
			if (result !== undefined) {
				return {
					err: null,
					message: `Eliminar producto ${id}`,
					result: result
				};
			} else {
				logger.error(`No se pudo eliminar el producto ${id}`)
				statusC = 404;
				return {
					err: 404,
					error: `No se pudo eliminar el producto`,
				};
			}
		});
		ctx.response.status = statusC;
		ctx.response.body = resFinal;
	};
}

module.exports = ProductosClass;