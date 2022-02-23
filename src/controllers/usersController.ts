import { Request, Response } from 'express';
import User from '../interface/User';
import Error from '../interface/Error';
import usersService from '../services/usersService';

async function createUser(req: Request, res: Response): Promise<Response> {
  const reqBody: User = req.body;

  const user = await usersService.createUser(reqBody);

  if ((user as Error).status) { 
    return res.status((user as Error).status)
      .json((user as Error).message);
  }

  return res.status(user.status).json(user.message) as Response;
}

export default { createUser };