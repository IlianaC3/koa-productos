const router = require('koa-router');
const fakerR = router({
  prefix: '/api/productos-test'
});
const FakerController = require('../controllers/REST/Faker');
const Faker = new FakerController()

fakerR.get('/', Faker.FakerController);

module.exports = fakerR;
