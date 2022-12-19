import { Post, PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query'],
});

class ListPostsService {
  public async execute(): Promise<Post[]> {
    const posts = await prisma.post.findMany();

    return posts;
  }
}

export default ListPostsService;