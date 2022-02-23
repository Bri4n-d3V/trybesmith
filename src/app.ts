import express from 'express';
import loginController from './controllers/loginController';
import productsController from './controllers/productsController';
import usersControllers from './controllers/usersController';

const app = express();
app.use(express.json());

app.post('/users', usersControllers.createUser);
app.post('/login', loginController.login);
app.post('/products', productsController.createProduct);

export default app;