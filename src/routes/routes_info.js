const router = require('koa-router');
const infoR = router({
  prefix: '/random'
});

const compression = require('koa-compress');
const InfoController = require('../controllers/REST/Info');
const GeneralInfo = new InfoController()

infoR.get('/info', compression(), GeneralInfo.Info);
//con child process
infoR.get('/api/randomsC', GeneralInfo.RandomsChildProccess);
//sin child process
infoR.get('/api/randoms', GeneralInfo.Randoms);

module.exports = infoR;