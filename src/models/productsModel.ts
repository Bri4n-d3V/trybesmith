import { ResultSetHeader } from 'mysql2';
import Product from '../interface/Product';
import connection from './connection';

async function createProduct(body:Product) : Promise<any> {
  try {
    const { name, amount } = body;

    const [result] = await connection.query<ResultSetHeader>(
      `INSERT INTO Trybesmith.Products (name, amount)
      VALUES (?, ?)`,
      [name, amount],
    );
      
    return result as any;
  } catch (error) {
    console.log('error =>', error);
    return error as false;
  }
}

export default { createProduct };