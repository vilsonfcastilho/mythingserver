import { PrismaClient, User } from '@prisma/client';
import AppError from '../../../shared/errors/AppError';
import IGetUserByIdDTO from '../dtos/IGetUserByIdDTO';

const prisma = new PrismaClient({
  log: ['query'],
});

class GetUserByIdService {
  public async execute({ id }: IGetUserByIdDTO): Promise<User> {
    const foundUser = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if(!foundUser || foundUser === null) {
      throw new AppError('User not found!');
    }

    return foundUser;
  }
}

export default GetUserByIdService;