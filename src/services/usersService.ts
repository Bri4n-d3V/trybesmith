import jwt from 'jsonwebtoken';
import User from '../interface/User';
import Error from '../interface/Error';
import usersModel from '../models/usersModel';
import usersSchema from '../schemas/usersSchema';

async function createUser(body: User): Promise<any | Error> {
  const { username, classe, level, password } = body;
  
  const checkUsername = usersSchema.validateUsername(username);
  const checkClasse = usersSchema.validateClasse(classe);
  const checkLevel = usersSchema.validateLevel(level);
  const checkPassword = usersSchema.validatePassword(password);

  if (checkUsername) return checkUsername as Error;
  if (checkClasse) return checkClasse as Error;
  if (checkLevel) return checkLevel as Error;
  if (checkPassword) return checkPassword as Error;

  await usersModel.createUser(body);
  
  const token = jwt.sign(
    body, 
    process.env.JWT_SECRET as string,
    { algorithm: 'HS256', expiresIn: '1d' },
  );
  
  return { status: 201, message: { token } };
}

export default { createUser };