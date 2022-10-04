const { randomCalc } = require('../../operations/randoms/randomCal')
const InfoClass = require('../../services/Info');
const InfoData = new InfoClass();
const forkFunction = require('../../operations/randoms/Fork')

class GeneralInfo {
    async Info() {
        let data = await InfoData.DataProject().then((result) => { return result});
        let test = await InfoData.ForLoop().then((result) => { return result});
        let result = {
            data: data,
            test: test
        }
        return result;
    };
    
    //con child process
    async RandomsChildProccess(args) {
        let random = args.cant === 0 ? 1e9 : args.cant;
        const forkResult = await forkFunction(random).then( result => { return result });
        return forkResult;
    };
    
    //sin child process
    async Randoms (args) {
        let random = args.cant === 0 ? 1e9 : args.cant;
        let result = randomCalc(random)
        if (result > 0) {
            return 'La sumatoria total fue '+ result
        } else {
            return null
        }
    };
}



module.exports = GeneralInfo;