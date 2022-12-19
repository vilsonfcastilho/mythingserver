import { PrismaClient } from '@prisma/client';
import AppError from '../../../shared/errors/AppError';
import IDeletePostDTO from '../dtos/IDeletePostDTO';

const prisma = new PrismaClient({
  log: ['query'],
});

class DeletePostService {
  public async execute({ id, userId }: IDeletePostDTO): Promise<void> {
    if (!id || id === null || id === '') {
      throw new AppError('The id parameter is required!', 400);
    }

    if (!userId || userId === null || userId === '') {
      throw new AppError('The userId parameter is required!', 400);
    }

    if (id !== userId) {
      throw new AppError('You are not the owner of this post!', 403);
    }

    const deletedPost = await prisma.post.delete({
      where: {
        id,
      },
    });

    if (!deletedPost) {
      throw new AppError('Ops! Something get wrong.', 400);
    }
  }
}

export default DeletePostService;