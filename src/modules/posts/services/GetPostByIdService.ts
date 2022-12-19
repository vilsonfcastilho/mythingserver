import { Post, PrismaClient, User } from '@prisma/client';
import AppError from '../../../shared/errors/AppError';
import IGetPostByIdDTO from '../dtos/IGetPostByIdDTO';

const prisma = new PrismaClient({
  log: ['query'],
});

class GetPostByIdService {
  public async execute({ id }: IGetPostByIdDTO): Promise<Post> {
    if (!id || id === null || id === '') {
      throw new AppError('The id parameter is required and cant be empty!')
    }

    const post = await prisma.post.findUnique({
      where: {
        id,
      },
    });

    if(!post || post === null) {
      throw new Error('Post not found!');
    }

    return post;
  }
}

export default GetPostByIdService;
