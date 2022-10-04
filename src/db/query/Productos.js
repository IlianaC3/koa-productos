const { DBP } = require('../connections/mysql')
const Messages = require('../../operations/Mesages')
const Msg = new Messages();
const logger = require('../../operations/logger')

class Productos {
	async SaveProduct(product) {
		return DBP('productos').insert(product)
			.then((id) => {
			return Msg.GenerateMessage('Producto', 'save', true, id);
		})
		.catch((err) => {
			logger.error(Msg.GenerateMessage('Producto', 'save', false, err));
			return undefined
		});
	}

	async ProductId(id) {
		return DBP('productos')
			.select({
				id: 'id',
				title: 'title',
				price: 'price',
				thumbnail: 'thumbnail'
			})
			.where({ id })
			.then((productos) => {
				return productos[0];
			})
			.catch((err) => {
				logger.error(Msg.GenerateMessage('Producto', 'read', false, id));
				return undefined;
			});
	}

	async ProductAll() {
		return DBP('productos')
			.select({
				id: 'id',
				title: 'title',
				price: 'price',
				thumbnail: 'thumbnail'
			})
			.then((productos) => {
				return productos;
			})
			.catch((err) => {
				console.error(err);
				logger.error(Msg.GenerateMessage('Productos', 'read', false, err));
				return undefined;
			});
	}

	async UpdateProduct(id, product) {
		return DBP('productos')
			.update(product)
			.where({ id })
			.then((result) => {
				if (result > 0) {
					return Msg.GenerateMessage('Producto', 'update', true, id)
				} else {
					logger.error(Msg.GenerateMessage('Producto', 'update', false, id));
					return null;
				}
			})
			.catch((err) => {
				logger.error(Msg.GenerateMessage('Producto', 'update', false, err));
				return undefined;
			});
	}

	async DeleteProduct(id) {
		return DBP('productos')
			.delete()
			.where({ id })
			.then((result) => {
				console.log("test", result)
				if (result > 0) {
					console.log("entra");
					return Msg.GenerateMessage('Producto', 'delete', true, id)
				} else {
					logger.error(Msg.GenerateMessage('Producto', 'delete', false, id));
					return undefined;
				}
			})
			.catch((err) => {
				logger.error(Msg.GenerateMessage('Producto', 'delete', false, err));
				return undefined;
			});
	}
}


module.exports = Productos;