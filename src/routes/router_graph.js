const fs = require('fs');
const router = require('koa-router');
const { buildSchema } = require('graphql');
const { graphqlHTTP } = require('express-graphql');
const path = require('path');
const ProductosR = require('../controllers/Graph/Productos');
const ProductoResolver = new ProductosR();
const ChatR = require('../controllers/Graph/Chat');
const ChatResolcer = new ChatR();
const UsuarioR = require('../controllers/Graph/Usuarios');
const UsuarioResolver = new UsuarioR();
const FakerR = require('../controllers/Graph/Faker');
const FakerResolver = new FakerR();
const InfoR = require('../controllers/Graph/Info');
const InfoResolver = new InfoR();

const schemaContenido = fs.readFileSync(path.join(__dirname, '../db/schemas/schema.graphql')).toString();
const schema = buildSchema(schemaContenido);

const graphMiddle = graphqlHTTP({
  schema,
  rootValue: {
    ProductAll: ProductoResolver.AllProductos,
    ProductId: ProductoResolver.UnProducto,
    SaveProduct: ProductoResolver.SaveProducto,
    UpdateProduct: ProductoResolver.updateProducto,
    DeleteProduct: ProductoResolver.DeleteProducto,
    GetMensajes: ChatResolcer.GetMensajes,
    SaveMensaje: ChatResolcer.SaveMensaje,
    Login: UsuarioResolver.Login,
    Signup: UsuarioResolver.Signup,
    ProductosFaker: FakerResolver.FakerController,
    Randoms: InfoResolver.Randoms,
    RandomsChild: InfoResolver.RandomsChildProccess,
    InfoProject: InfoResolver.Info
  },
  graphiql: true,
});

const graphQlRouter = router({
  prefix: ''
});
graphQlRouter.use('/graphql', graphMiddle);

module.exports = graphQlRouter;