import { PrismaClient, User } from '@prisma/client';
import { sign } from 'jsonwebtoken';

import authConfig from '../../../config/auth';
import AppError from '../../../shared/errors/AppError';
import BCryptHashProvider from '../providers/HashProvider/implementations/BCryptHashProvider';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

const prisma = new PrismaClient({
  log: ['query'],
});

class CreateSessionService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    if (!email || email === null || email === '') {
      throw new AppError('The email parameter is required and cant be empty!');
    }

    if (!password || password === null || password === '') {
      throw new AppError('The password parameter is required and cant be empty!');
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new AppError('Incorrect e-mail/password combination.', 401);
    }

    const hashProvider = new BCryptHashProvider();
    const matchedPassword = await hashProvider.compareHash(
      password,
      user.password,
    );

    if (!matchedPassword) {
      throw new AppError('Incorrect e-mail/password combination.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default CreateSessionService;