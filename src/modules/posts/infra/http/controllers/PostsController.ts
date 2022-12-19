import { Request, Response } from 'express';
import ListPostsService from '../../../services/ListPostsService';
import GetPostByIdService from '../../../services/GetPostByIdService';
import CreatePostService from '../../../services/CreatePostService';
import UpdatePostService from '../../../services/UpdatePostService';

class UsersController {
  public async list(req: Request, res: Response): Promise<Response> {
    const listPosts = new ListPostsService();

    const posts = await listPosts.execute();

    return res.status(200).send({ posts });
  }

  public async getById(req: Request, res: Response): Promise<Response> {
    const { id } = req.query;

    const getPostById = new GetPostByIdService();

    const foundPost = await getPostById.execute({ id });

    return res.status(200).send({ foundPost });
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { id: userId } = req.user;
    const { text } = req.body;

    const createPost = new CreatePostService();

    const post = await createPost.execute({
      userId,
      text,
    });

    return res.status(201).send({ post });
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id: userId } = req.user;
    const { id } = req.query;
    const { text } = req.body;

    const updatePost = new UpdatePostService();

    const updatedPost = await updatePost.execute({
      id,
      userId,
      text,
    });

    return res.status(200).send({ updatedPost });
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    return res.status(204);
  }
}

export default UsersController;