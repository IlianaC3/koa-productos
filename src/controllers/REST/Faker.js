const FakerService = require('../../services/Faker')
const FakerP = new FakerService();

class FakerClass {
    async FakerController(ctx) {
        let statusC = 200;
        let resFinal = await FakerP.FakerFunction().then((result) => {
            if (result !== undefined) {
                return {
                    err: null,
                    message: `Productos`,
                    result: result
                };
            } else {
                statusC = 404;
                return {
                    error: `No existen productos`,
                };
            }
        });
        ctx.response.status = statusC;
        ctx.response.body = resFinal;
    }
}

module.exports = FakerClass