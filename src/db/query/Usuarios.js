const { DatabaseUsuarios } = require('../schemas/schema')

class Usuarios {
    async CheckUser(email) {
        return DatabaseUsuarios.find({ 'email': email }, { __v: 0 });
    } 
    
    async SaveUsuario(object) {
        console.log(object);
        return DatabaseUsuarios.create(object);
    } 
    
    async FindUser(email) {
        return DatabaseUsuarios.findOne({ 'email': email }, { __v: 0 });
    } 
}


module.exports = Usuarios;