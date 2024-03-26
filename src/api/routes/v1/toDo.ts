import { Router } from 'express';
import { container } from 'tsyringe';
import ToDoController from '../../controllers/toDoController';

export default async (): Promise<Router> => {
  const router = Router();
  const toDoController = container.resolve(ToDoController);

  router.post(
    '/create',
    toDoController.create
  );

  router.get('/', toDoController.findAll);
  router.get(
    '/:id',
    toDoController.findById
  );

  router.put(
    '/update/description/:id',
    toDoController.updateDescription
  );

  router.put(
    '/update/status/:id',
    toDoController.updateStatus
  );

  router.delete(
    '/:id',
    toDoController.delete
  );

  return router;
};
