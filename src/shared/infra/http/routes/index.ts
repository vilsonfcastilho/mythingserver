import { Router } from 'express';

import usersRouter from '../../../../modules/users/infra/http/routes/users.routes';
import sessionsRouter from '../../../../modules/users/infra/http/routes/sessions.routes';
import postsRouter from '../../../../modules/posts/infra/http/routes/posts.routes';
import commentsRouter from '../../../../modules/comments/infra/http/routes/comments.routes';

const router = Router();

router.use('/users', usersRouter);
router.use('/sessions', sessionsRouter);
router.use('/posts', postsRouter);
router.use('/comments', commentsRouter);

export default router;
