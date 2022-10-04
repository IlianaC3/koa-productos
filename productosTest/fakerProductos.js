const fakerData = require('../src/services/Faker')
const fakerProducto = new fakerData();

let newProducto = async function() {
    const result = await fakerProducto.FakerFunctionObject();
    // console.log(result);
    return result;
}

module.exports = { newProducto }