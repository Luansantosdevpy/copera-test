import getHealthCheck from './healthcheck/getHealthCheck';
import getOneTaskById from './toDo/getOneTaskById';
import deleteOneTasksById from './toDo/deleteOneTasksById';
import updateOneStatusById from './toDo/updateOneStatusById';
import updateOneDescriptionById from './toDo/updateOneDescriptionById';
import completeTasksInBatch from './toDo/completeTasksInBatch';
import deleteTasksInBatch from './toDo/deleteTasksInBatch';
import getAllTasks from './toDo/getAllTasks';
import getCompleteAndIncompleteToDos from './toDo/getCompleteAndIncompleteToDos';

export default {
  paths: {
    '/api': {
      ...getHealthCheck
    },
    '/ap1/todo/:id': {
        ...getOneTaskById,
        ...deleteOneTasksById
    },
    '/api/todo/update-status/:id': {
        ...updateOneStatusById
    },
    '/api/todo/update-description/:id': {
        ...updateOneDescriptionById
    },
    '/api/todo/complete-in-batch': {
        ...completeTasksInBatch
    },
    '/api/todo/delete-in-batch': {
        ...deleteTasksInBatch
    },
    '/api/todo/get-count-todo': {
        ...getCompleteAndIncompleteToDos
    },
    '/api/todo': {
        ...getAllTasks
    }
  }
};
