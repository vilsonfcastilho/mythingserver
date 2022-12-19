import { PrismaClient, User } from '@prisma/client';
import AppError from '../../../shared/errors/AppError';
import IUpdateUserDTO from '../dtos/IUpdateUserDTO';

const prisma = new PrismaClient({
  log: ['query'],
});

class UpdateUserService {
  public async execute({
    id,
    userId,
    name,
    email,
    password,
    avatarUrl,
    about,
  }: IUpdateUserDTO): Promise<User> {
    if (!id || id === null || id === '') {
      throw new AppError('The id parameter is required!', 400);
    }

    if (!userId || userId === null || userId === '') {
      throw new AppError('The userId parameter is required!', 400);
    }

    if (id !== userId) {
      throw new AppError('You are not the owner of this profile!', 403);
    }

    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        password,
        avatarUrl,
        about,
      }
    });

    return updatedUser;
  }
}

export default UpdateUserService;