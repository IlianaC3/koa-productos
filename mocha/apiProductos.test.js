const request = require('supertest')('http://127.0.0.1:3000');
const { expect } = require('chai');
const {describe, it} = require('mocha');
const { newProducto } = require('../productosTest/fakerProductos')

const allProductos = async function() {
    describe('test api get todos los productos', () => {
        describe('GET', () => {
            it('debe traer status 200 cuando hay datos', async() => {
                let resp = await request.get(`/api/productos/`);
                console.log(resp._body.result)
                expect(resp.status).to.eql(200);
            })
        })
    })
}

const oneProducto = async function(id) {
    describe('test api get un producto por id', () => {
        describe('GET', () => {
            it('debe traer status 200 cuando hay datos', async() => {
                let resp = await request.get(`/api/productos/${id}`);
                expect(resp.status).to.eql(200);
            })
        })
    })
}

const SaveProduct = async function() {
    let product = await newProducto();
    describe('test api post guardar un producto', () => {
        describe('POST', () => {
            it('debe traer status 200 cuando se guarda el dato', async() => {
                let resp = await request.post(`/api/productos/`).send(product);
                expect(resp.status).to.eql(200);
            })
        })
    })
}

const UpdateProducto = async function(id) {
    let product = await newProducto();
    describe('test api put editar un producto por id', () => {
        describe('PUT', () => {
            it('debe traer status 200 cuando se guarda el dato', async() => {
                let resp = await request.put(`/api/productos/${id}`).send(product);
                expect(resp.status).to.eql(200);
            })
        })
    })
}

const DeleteProducto = async function(id) {
    describe('test api delete eliminar un producto por id', () => {
        describe('DELETE', () => {
            it('debe traer status 200 cuando se elimina el dato', async() => {
                let resp = await request.delete(`/api/productos/${id}`);
                // console.log(resp._body.result);
                expect(resp.status).to.eql(200);
            })
        })
    })
}

// allProductos()
// oneProducto(21)
SaveProduct();
// UpdateProducto(34);
// DeleteProducto(33)