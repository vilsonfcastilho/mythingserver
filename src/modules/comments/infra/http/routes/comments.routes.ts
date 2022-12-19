import { Router } from 'express';
import ensureAuthenticated from '../../../../users/infra/http/middlewares/ensureAuthenticated';

import CommentsController from '../controllers/CommentsController';

const commentsRouter = Router();
const commentsController = new CommentsController();

commentsRouter.get('/list', commentsController.list);

commentsRouter.get('/', commentsController.getById);

commentsRouter.post('/', ensureAuthenticated, commentsController.create);

commentsRouter.put('/', ensureAuthenticated, commentsController.update);

commentsRouter.delete('/', ensureAuthenticated, commentsController.delete);

export default commentsRouter;