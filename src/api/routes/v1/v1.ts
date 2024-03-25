import { Router } from 'express';

export default async (): Promise<Router> => {
  const router = Router();

  router.use('/api', router);

  return router;
};
