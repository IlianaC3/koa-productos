const Productos = require('../../services/Productos');
const Producto = new Productos();
const logger = require('../../operations/logger')

class ProductosClass {
	async AllProductos() {
		logger.info('Solicita todos los productos');
        const result = await Producto.getAll();
        return result;
	};
	
	async UnProducto(args) {
		logger.info('Solicita un producto')
		const result = await Producto.getById(args.id);
        console.log(result)
        return result;
	};
	
	async SaveProducto(args) {
		logger.info('Crea un producto')
        console.log(args);
		if (args.product.title != '' && args.product.price > 0 && args.product.thumbnail != '') {
			let nuevoProducto = {
				title: args.product.title,
				price: args.product.price,
				thumbnail: args.product.thumbnail
			}
			const result = await Producto.save(nuevoProducto);
            return result;
		} else {
			return undefined
		}
	};
	
	async updateProducto(args) {
		logger.info('Edita un producto')
		if (args.product.title != '' && args.product.price > 0 && args.product.thumbnail != '' && args.id > 0) {
			let editarProducto = {
				title: args.product.title,
				price: args.product.price,
				thumbnail: args.product.thumbnail
			}
			const result = await Producto.updateById(args.id, editarProducto);
            return result
		} else {
			return undefined
		}
		
	};
	
	async DeleteProducto(args) {
		logger.info('Elimina un producto')
		const result = await Producto.deleteById(args.id);
        return result;
	};
}

module.exports = ProductosClass;