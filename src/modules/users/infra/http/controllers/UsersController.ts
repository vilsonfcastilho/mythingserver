import { Request, Response } from 'express';
import ListUsersService from '../../../services/ListUsersService';
import GetUserByIdService from '../../../services/GetUserByIdService';
import CreateUserService from '../../../services/CreateUserService';
import UpdateUserService from '../../../services/UpdateUserService';
import DeleteUserService from '../../../services/DeleteUserService';

class UsersController {
  public async list(req: Request, res: Response): Promise<Response> {
    const listUsers = new ListUsersService();

    const users = await listUsers.execute();

    return res.send({ users });
  }

  public async getById(req: Request, res: Response): Promise<Response> {
    const { id } = req.query;

    const getUserById = new GetUserByIdService();

    const foundUser = await getUserById.execute({ id });

    return res.send({ foundUser });
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { username, email, name, password } = req.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      username,
      email,
      name,
      password,
    });

    return res.status(201).send({ user });
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id: userId } = req.user;
    const { id } = req.query;
    const { name, email, password, avatarUrl, about } = req.body;

    const updateUser = new UpdateUserService();

    const updatedUser = await updateUser.execute({
      id,
      userId,
      name,
      email,
      password,
      avatarUrl,
      about,
    });

    return res.status(200).send({ updatedUser });
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id: userId } = req.user;
    const { id } = req.query;

    const deleteUser = new DeleteUserService();

    await deleteUser.execute({
      id,
      userId,
    });

    return res.status(204);
  }
}

export default UsersController;