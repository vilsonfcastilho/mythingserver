import { Router } from 'express';
import ensureAuthenticated from '../../../../users/infra/http/middlewares/ensureAuthenticated';

import PostsController from '../controllers/PostsController';

const postsRouter = Router();
const postsController = new PostsController();

postsRouter.get('/list', postsController.list);

postsRouter.get('/', postsController.getById);

postsRouter.post('/', ensureAuthenticated, postsController.create);

postsRouter.put('/', ensureAuthenticated, postsController.update);

postsRouter.delete('/', ensureAuthenticated, postsController.delete);

export default postsRouter;
