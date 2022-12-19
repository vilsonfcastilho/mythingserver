import { PrismaClient, Post } from '@prisma/client';
import AppError from '../../../shared/errors/AppError';
import ICreatePostDTO from '../dtos/ICreatePostDTO';

const prisma = new PrismaClient({
  log: ['query'],
});

class CreatePostService {
  public async execute({
    userId,
    text,
  }: ICreatePostDTO): Promise<Post | AppError> {
    if (!userId || userId === null) {
      throw new AppError('The userId parameter is required!', 400);
    }

    if (!text || text === null || text === '') {
      throw new AppError('The text parameter is required and cant be empty!', 400);
    }

    const post = await prisma.post.create({
      data: {
        userId,
        text,
      },
    });

    if (!post) {
      throw new AppError('Ops! Something get wrong.', 400);
    }

    return post;
  }
}

export default CreatePostService;