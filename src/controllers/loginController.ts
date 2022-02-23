import { Request, Response } from 'express';
import Login from '../interface/Login';
import Error from '../interface/Error';
import loginService from '../services/loginService';

async function login(req: Request, res: Response): Promise<Response> {
  const reqBody: Login = req.body;

  const response = await loginService.login(reqBody);

  if ((response as Error).status) { 
    return res.status((response as Error).status)
      .json((response as Error).message);
  }

  return res.status(response.status).json(response.message) as Response;
}

export default { login };