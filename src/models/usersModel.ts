import { ResultSetHeader } from 'mysql2';
import connection from './connection';
import User from '../interface/User';

async function createUser(body: User) : Promise <any> {
  try {
    const { username, classe, level, password } = body;

    const [result] = await connection.query<ResultSetHeader>(
      'INSERT INTO Users (username, classe, level, password) VALUES (?, ?, ?, ?)', 
      [username, classe, level, password],
    );

    console.log('result =>', result);
    return result as any;
  } catch (error) {
    console.log('error =>', error);
    return error as false;
  }
}

export default { createUser };