const ChatNorm = require('../../services/Chat');
const ChatNormalizr = new ChatNorm();

const logger = require('../../operations/logger')

class Chat {
	async GetMensajes() {
		logger.info('Obtiene todos los mensajes');
      const resultChat = await ChatNormalizr.getAll();
      // console.log(resultChat)
      return resultChat;
	};
	
	async SaveMensaje(args) {
      logger.info('Enviar mensaje')
      // console.log(args);
      let chat = {
         text: args.chat.text,
         autor: {
            nombre: args.chat.nombre,
            apellido: args.chat.apellido,
            edad: args.chat.edad,
            avatar: args.chat.avatar,
            alias: args.chat.alias,
            email: args.chat.email,
            id: args.chat.id
         }
      }  
      console.log(chat)
      const saveChat = await ChatNormalizr.save(chat)
      if (saveChat == undefined) {
         logger.error('No se pudo guardar el mensaje');
         return undefined
      } else {
         const ChatConstN2 = await ChatNormalizr.getAll()
         return ChatConstN2;
      }
	};

}

module.exports = Chat