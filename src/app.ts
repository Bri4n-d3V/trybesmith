import express from 'express';
import loginController from './controllers/loginController';
import usersControllers from './controllers/usersController';

const app = express();
app.use(express.json());

app.post('/users', usersControllers.createUser);
app.post('/login', loginController.login);

export default app;