const axios = require('axios');
const { newProducto } = require('../productosTest/fakerProductos')

let url = `http://127.0.0.1:3000`;

//Gets
const AllProducts = async function() {
    axios.get(`${url}/api/productos/`).then(resp => { console.log(resp, resp.headers, resp.data); return resp; }).catch(error => console.error(error));
}

const OneProduct = async function(id) {
    axios.get(`${url}/api/productos/${id}`).then(resp => { console.log(resp, resp.headers, resp.data); return resp; }).catch(error => console.error(error));
}

//Post
const SaveProduct = async function() {
    let product = await newProducto();
    axios.post(`${url}/api/productos/`, product).then(resp => { console.log(resp, resp.headers, resp.data); return resp; }).catch(error => console.error(error));
}

//Put
const UpdateProduct = async function(id) {
    let product = await newProducto();
    axios.put(`${url}/api/productos/${id}`, product).then(resp => { console.log(resp, resp.headers, resp.data); return resp; }).catch(error => console.error(error));
}

//Delete
const DeleteProduct = async function(id) {
    axios.delete(`${url}/api/productos/${id}`).then(resp => { console.log(resp, resp.headers, resp.data); return resp; }).catch(error => console.error(error));
}

// AllProducts();
// OneProduct(32);
// SaveProduct();
// UpdateProduct(32);
// DeleteProduct(32);