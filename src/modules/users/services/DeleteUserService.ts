import { PrismaClient, User } from '@prisma/client';
import AppError from '../../../shared/errors/AppError';
import IDeleteUserDTO from '../dtos/IDeleteUserDTO';

const prisma = new PrismaClient({
  log: ['query'],
});

class DeleteUserService {
  public async execute({ id, userId }: IDeleteUserDTO): Promise<void> {
    if (!id || id === null || id === '') {
      throw new AppError('The id parameter is required!', 400);
    }

    if (!userId || userId === null || userId === '') {
      throw new AppError('The userId parameter is required!', 400);
    }

    if (id !== userId) {
      throw new AppError('You are not the owner of this profile!', 403);
    }

    const deletedUser = await prisma.user.delete({
      where: {
        id,
      },
    });

    if (!deletedUser) {
      throw new AppError('Ops! Something get wrong.', 400);
    }
  }
}

export default DeleteUserService;