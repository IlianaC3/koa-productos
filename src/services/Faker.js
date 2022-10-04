const { faker } = require('@faker-js/faker');

class FakerP {
    constructor() {
        this.dataFaker = [];
        this.oneData = {};
    }
    
    async FakerFunction() {
        for (let index = 0; index < 5; index++) {
            let data = {
                id: faker.random.numeric(),
                title: faker.commerce.product(),
                price: faker.commerce.price(1000, 999999),
                thumbnail: faker.image.food(400, 400, true)
            }
            this.dataFaker.push(data)
        }
        return this.dataFaker
    }

    async FakerFunctionObject() {
        this.oneData = {
            title: faker.commerce.product(),
            price: faker.commerce.price(1000, 999999),
            thumbnail: faker.image.food(400, 400, true)
        }
        return this.oneData
    }
}

module.exports = FakerP