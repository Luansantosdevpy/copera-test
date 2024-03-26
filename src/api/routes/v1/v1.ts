import { Router } from 'express';
import healthCheck from './healthCheck';

export default async (): Promise<Router> => {
  const router = Router();

  router.use('/api', router);
  router.use('/', await healthCheck());

  return router;
};
