const { randomCalc } = require('../../operations/randoms/randomCal')
const InfoClass = require('../../services/Info');
const InfoData = new InfoClass();
const forkFunction = require('../../operations/randoms/Fork')

class GeneralInfo {
    async Info(ctx) {
        let data = await InfoData.DataProject().then((result) => { return result});
        let test = await InfoData.ForLoop().then((result) => { return result})
        ctx.body = {
            message: 'Datos',
            elementos: data,
            test: test
        };
    };
    
    //con child process
    async RandomsChildProccess(ctx) {
        let random = ctx.query.cant === undefined ? 1e9 : ctx.query.cant;
        const forkResult = await forkFunction(random).then( result => { return result });
        ctx.body = {
            data: forkResult
        };
    };
    
    //sin child process
    async Randoms (ctx) {
        let random = ctx.query.cant === undefined ? 1e9 : ctx.query.cant;
        let result = randomCalc(random)
        if (result > 0) {
            ctx.body = {
             data: 'La sumatoria total fue '+ result
            }
        } else {
            ctx.body = {
                data: 'Sumatoria no realizada'
            }
        }
    };
}



module.exports = GeneralInfo;