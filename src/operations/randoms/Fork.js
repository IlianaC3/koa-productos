const { fork } = require('child_process');
const forkFunction = async (random) => new Promise((resolve, reject) => {
    const forkeando = fork(process.cwd()+'/src/operations/randoms/randomFork');
    forkeando.send(random);
    forkeando.on('message', (result) => {
        // console.log(result);
        if (result > 0) {
            resolve('La sumatoria total fue '+ result)
        } else {
            resolve(null)
        }
        
    });
});

module.exports = forkFunction