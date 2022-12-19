import { PrismaClient, Post } from '@prisma/client';
import AppError from '../../../shared/errors/AppError';
import IUpdatePostDTO from '../dtos/IUpdatePostDTO';

const prisma = new PrismaClient({
  log: ['query'],
});

class UpdatePostService {
  public async execute({
    id,
    userId,
    text,
  }: IUpdatePostDTO): Promise<Post> {
    if (!id || id === null || id === '') {
      throw new AppError('The id parameter is required!', 400);
    }

    if (!userId || userId === null || userId === '') {
      throw new AppError('The userId parameter is required!', 400);
    }

    if (id !== userId) {
      throw new AppError('You are not the owner of this post!', 403);
    }

    const updatedPost = await prisma.post.update({
      where: {
        id,
      },
      data: {
        text,
        updatedAt: new Date().toISOString(),
      },
    });

    return updatedPost;
  }
}

export default UpdatePostService;