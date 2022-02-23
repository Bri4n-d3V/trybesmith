import Error from '../interface/Error';

function validateUsername(username: string) : Error | void {
  if (!username) {
    return { status: 400,
      message: { error: 'Username is required' } } as Error;
  }
}

function validatePassword(password: string) : Error | void {
  if (!password) {
    return { status: 400,
      message: { error: 'Password is required' } } as Error;
  }
}

export default { validateUsername, validatePassword };