import Error from '../interface/Error';

function validateUsername(username: string) : Error | void {
  if (!username) {
    return { status: 400,
      message: { error: 'Username is required' } } as Error;
  }

  if (typeof username !== 'string') {
    return { status: 422,
      message: { error: 'Username must be a string' } } as Error;
  }

  if (username.length <= 2) {
    return { status: 422,
      message: { error: 'Username must be longer than 2 characters' } } as Error;
  }
}

function validateClasse(classe: string) : Error | void {
  if (!classe) {
    return { status: 400,
      message: { error: 'Classe is required' } } as Error;
  }

  if (typeof classe !== 'string') {
    return { status: 422,
      message: { error: 'Classe must be a string' } } as Error;
  }

  if (classe.length <= 2) {
    return { status: 422,
      message: { error: 'Classe must be longer than 2 characters' } } as Error;
  }
}

function validateLevel(level: number) : Error | void {
  if (level === undefined) {
    return { status: 400,
      message: { error: 'Level is required' } } as Error;
  }

  if (typeof level !== 'number') {
    return { status: 422,
      message: { error: 'Level must be a number' } } as Error;
  }

  if (level <= 0) {
    return { status: 422,
      message: { error: 'Level must be greater than 0' } } as Error;
  }
}

function validatePassword(password: string) : Error | void {
  if (!password) {
    return { status: 400,
      message: { error: 'Password is required' } } as Error;
  }

  if (typeof password !== 'string') {
    return { status: 422,
      message: { error: 'Password must be a string' } } as Error;
  }

  if (password.length <= 7) {
    return { status: 422,
      message: { error: 'Password must be longer than 7 characters' } } as Error;
  }
}

export default { validateUsername, validateClasse, validateLevel, validatePassword };