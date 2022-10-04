
class PublicAuth {
    async publicAuthorization(ctx, next) {
        console.log(ctx)
        if (ctx.isAuthenticated()) {
            next()
        } else {
            ctx.redirect('/login')
        }
    }
}


module.exports = PublicAuth