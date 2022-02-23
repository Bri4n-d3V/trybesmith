import jwt from 'jsonwebtoken';
import Error from '../interface/Error';
import usersModel from '../models/usersModel';
import Login from '../interface/Login';
import loginSchema from '../schemas/loginSchema';

async function login(body: Login) : Promise <Error | any> {
  const { username, password } = body;

  const checkUsername = loginSchema.validateUsername(username);
  const checkLogin = loginSchema.validatePassword(password);

  if (checkUsername) return checkUsername as Error;
  if (checkLogin) return checkLogin as Error;

  const result = await usersModel.login(body);

  if (result.length === 0) {
    return { status: 401,
      message: { error: 'Username or password invalid' } } as Error;
  }

  const token = jwt.sign(
    body, 
    'GUESSWHAT?' as string,
    { algorithm: 'HS256', expiresIn: '1d' },
  );
  
  if (result.length !== 0) return { status: 200, message: { token } };
}

export default { login };