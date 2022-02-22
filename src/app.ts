import express from 'express';
import usersControllers from './controllers/usersControllers';

const app = express();
app.use(express.json());

app.post('/users', usersControllers.createUser);

export default app;