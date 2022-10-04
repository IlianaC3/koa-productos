const logger = require('../../operations/logger');
const Usuarios = require('../../services/Usuarios');
const Usuario = new Usuarios();

class UsuariosClass {
    async Login(args) {
        let usuario = {
            email: args.email,
            password: args.password
        }
        const result = await Usuario.loginUser(usuario);
        return result;
     };
     
     async Signup(args) {
        let usuario = {
            email: args.email,
            password: args.password,
            name: args.email.split('@')[0]
        }
        const result = await Usuario.save(usuario);

        return result;
    }
    
}

 module.exports = UsuariosClass