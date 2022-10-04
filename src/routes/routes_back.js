const router = require('koa-router');
const back = router({
  prefix: '/api/productos'
});
const ProductosClass = require('../controllers/REST/Productos');
const Productos = new ProductosClass();


back.get('/', Productos.AllProductos);

back.get('/:id', Productos.UnProducto);

back.post('/', Productos.SaveProducto);

back.put('/:id', Productos.updateProducto);

back.delete('/:id', Productos.DeleteProducto);

module.exports = back;
