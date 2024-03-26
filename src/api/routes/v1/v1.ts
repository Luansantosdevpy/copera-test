import { Router } from 'express';
import healthCheck from './healthCheck';
import toDo from './toDo';
import swagger from './swagger';

export default async (): Promise<Router> => {
  const router = Router();

  router.use('/api', router);
  router.use('/', await healthCheck());
  router.use('/todo', await toDo());
  router.use('/', await swagger());

  return router;
};
