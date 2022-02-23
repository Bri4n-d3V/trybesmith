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
  
  return { status: 201,
    message: { 
      item: { id: product.insertId, name, amount },
    }, 
  };
}

async function getAllProducts(authorization : string) : Promise < any > {
  if (!authorization) {
    return { status: 401,
      message: { error: 'Token not found' } };
  }

  const checkToken = await productsSchema.validateToken(authorization);

  if (checkToken) return checkToken as Error;

  const products = await productsModel.getAllProducts();
  console.log('products =>', products);

  return { status: 200,
    message: products };
}

export default { createProduct, getAllProducts };