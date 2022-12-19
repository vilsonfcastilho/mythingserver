import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import UsersController from '../controllers/UsersController';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.get('/list', usersController.list);

usersRouter.get('/', usersController.getById);

usersRouter.post('/', usersController.create);

usersRouter.put('/', ensureAuthenticated, usersController.update);

usersRouter.delete('/', ensureAuthenticated, usersController.delete);

export default usersRouter;