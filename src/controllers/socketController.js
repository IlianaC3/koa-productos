//Socket
//DB y Clases
const Productos = require('../services/Productos');
const ChatNorm = require('../services/Chat');
const Producto = new Productos();
const ChatNormalizr = new ChatNorm();

const logger = require('../operations/logger')

class Websockets {
   async websocketController (socket, ioServer) {
      // const io = new Server(server);
      logger.info('Petición inical de productos')
      socket.emit('listProducts', await Producto.getAll());
      logger.info('Lista de chats')
      socket.emit('listMessages', await ChatNormalizr.getAll());

      socket.on("messages", async (data) => {
         logger.info('Envía mensaje')
         await ChatNormalizr.save(data);
         ioServer.sockets.emit("listMessages", await ChatNormalizr.getAll());
      });
      socket.on("newProduct", async (data) => {
         logger.info('Envía producto')
         await Producto.save(data);
         ioServer.sockets.emit("listProducts", await Producto.getAll());
      });
   }
}



module.exports = Websockets