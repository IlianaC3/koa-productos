const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const Usuarios = require('../services/Usuarios');
const Usuario = new Usuarios();

passport.use('registration', new LocalStrategy((username, password, callback) => {
    let usuario = {
		email: username,
		password: password,
		name: username.split('@')[0]
	}
	Usuario.save(usuario).then((result) => {
		// console.log(result);
		if (result === undefined) {
			callback(null, { data: -1 });
		} else if(result === null) {
			callback(null, { data: 0 });
		} else {
			callback(null, { data: usuario.email } );
		}
	});
}));

passport.use('authentication', new LocalStrategy((username, password, done) => {
    let usuario = {
		email: username,
		password: password
	}
    Usuario.loginUser(usuario).then((result) => {
		console.log(result)
        if (result === undefined) {
			return done(null, { email: -1 });
		} else if (result === null) {
			return done(null, { email: 0 });
		} else {
			return done(null, result)
		}
    });
}));

passport.serializeUser((usuario, done) => {
	// console.log("usuario", usuario)
  	done(null, usuario);
});

passport.deserializeUser((username, done) => {
//   console.log("username", username)
  done(null, username);
});

module.exports = passport;