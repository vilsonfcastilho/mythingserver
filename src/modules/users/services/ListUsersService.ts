import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query'],
});

class ListUsersService {
  public async execute(): Promise<User[]> {
    const users = await prisma.user.findMany();

    return users;
  }
}

export default ListUsersService;