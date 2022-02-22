import jwt from 'jsonwebtoken';
import User from '../interface/User';
import Error from '../interface/Error';
import usersModel from '../models/usersModel';

async function createUser(body: User): Promise<any | Error> {
  // const { username, classe, level, password } = body;

  if (!body) {
    return {
      status: 404,
      message: 'ta errado',
    } as Error;
  }

  await usersModel.createUser(body);
  
  const token = jwt.sign(
    body, 
    process.env.JWT_SECRET as string,
    { algorithm: 'HS256', expiresIn: '1d' },
  );

  console.log('token =>', token);
  
  return { status: 201, message: { token } };
}

export default { createUser };