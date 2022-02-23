import jwt from 'jsonwebtoken';
import Error from '../interface/Error';

function validateName(name: string) : Error | void {
  if (!name) {
    return { status: 400,
      message: { error: 'Name is required' } } as Error;
  }

  if (typeof name !== 'string') {
    return { status: 422,
      message: { error: 'Name must be a string' } } as Error;
  }

  if (name.length <= 2) {
    return { status: 422,
      message: { error: 'Name must be longer than 2 characters' } } as Error;
  }
}

function validateAmount(amount: string) : Error | void {
  if (!amount) {
    return { status: 400,
      message: { error: 'Amount is required' } } as Error;
  }

  if (typeof amount !== 'string') {
    return { status: 422,
      message: { error: 'Amount must be a string' } } as Error;
  }

  if (amount.length <= 2) {
    return { status: 422,
      message: { error: 'Amount must be longer than 2 characters' } } as Error;
  }
}

async function validateToken(authorization : string) : Promise < Error | void > {
  try {
    await jwt.verify(authorization, process.env.JWT_SECRET as string);
  } catch (error) {
    return { status: 401, message: { error: 'Invalid token' } };
  }
}

export default { validateName, validateAmount, validateToken };