import Error from '../interface/Error';
import productsModel from '../models/productsModel';
import productsSchema from '../schemas/productsSchema';
import Product from '../interface/Product';

async function createProduct(body : Product, authorization : string) : Promise <Error | any> {
  const { name, amount } = body;

  if (!authorization) {
    return { status: 401,
      message: { error: 'Token not found' } };
  }
  
  const checkName = productsSchema.validateName(name);
  const checkAmount = productsSchema.validateAmount(amount);
  const checkToken = await productsSchema.validateToken(authorization);

  if (checkName) return checkName as Error;
  if (checkAmount) return checkAmount as Error;
  if (checkToken) return checkToken as Error;

  const product = await productsModel.createProduct(body);
  console.log('product =>', product);
  
  return { status: 201,
    message: { 
      item: { id: product.insertId, name, amount },
    }, 
  };
}

export default { createProduct };