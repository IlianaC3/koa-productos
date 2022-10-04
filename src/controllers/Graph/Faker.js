const FakerService = require('../../services/Faker')
const FakerP = new FakerService();

class FakerClass {
    async FakerController() {
        return await FakerP.FakerFunction()
    }
}

module.exports = FakerClass