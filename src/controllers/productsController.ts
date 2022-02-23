import { Request, Response } from 'express';
import Product from '../interface/Product';
import Error from '../interface/Error';
import productsService from '../services/productsService';

async function createProduct(req: Request, res: Response): Promise<Response> {
  const reqBody : Product = req.body;
  const { authorization } = req.headers;

  const response = await productsService.createProduct(reqBody, authorization as string);

  if ((response as Error).status) { 
    return res.status((response as Error).status)
      .json((response as Error).message);
  }

  return res.status(response.status).json(response.message) as Response;
}

export default { createProduct };