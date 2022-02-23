import { ResultSetHeader } from 'mysql2';
import connection from './connection';
import User from '../interface/User';
import Login from '../interface/Login';

async function createUser(body: User): Promise<any> {
  try {
    const { username, classe, level, password } = body;

    const [result] = await connection.query<ResultSetHeader>(
      'INSERT INTO Trybesmith.Users (username, classe, level, password) VALUES (?, ?, ?, ?)',
      [username, classe, level, password],
    );
      
    return result as any;
  } catch (error) {
    console.log('error =>', error);
    return error as false;
  }
}

async function login(body: Login): Promise<any> {
  try {
    const { username, password } = body;

    const [result] = await connection.query<ResultSetHeader>(
      `SELECT username, password FROM Trybesmith.Users
      WHERE username = ? AND password = ?;`,
      [username, password],
    );

    return result as any;
  } catch (error) {
    console.log('error =>', error);
    return error as false;
  }
}

export default { createUser, login };