import { PrismaClient, User } from '@prisma/client';
import AppError from '../../../shared/errors/AppError';
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import BCryptHashProvider from '../providers/HashProvider/implementations/BCryptHashProvider';

const prisma = new PrismaClient({
  log: ['query'],
});

class CreateUserService {
  public async execute({
    username,
    email,
    name,
    password,
  }: ICreateUserDTO): Promise<User> {
    const hashProvider = new BCryptHashProvider()

    const hashedPassword = await hashProvider.generateHash(password);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        name,
        password: hashedPassword,
      },
    });

    if (!user) {
      throw new AppError('Ops! Something get wrong.', 400);
    }

    return user;
  }
}

export default CreateUserService;