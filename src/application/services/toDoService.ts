import { inject, injectable } from 'tsyringe';
import Logger from '../../infrastructure/log/logger';
import ValidationError from '../exceptions/validationError';
import ToDoInterface from '../../domain/interfaces/modelInterfaces/toDoInterface';
import ToDoRepositoryInterface from '../../domain/interfaces/repositories/toDoRepositoryInterface';

@injectable()
class ToDoService {
  constructor(
    @inject('ToDoRepositoryInterface')
    public readonly toDoRepository: ToDoRepositoryInterface
  ) {}

  async create(toDo: ToDoInterface): Promise<ToDoInterface> {
    Logger.debug('ToDoService - create - call toDoRepository.save');
    return this.toDoRepository.save(toDo);
  }

  public findAll = async (page: number = 1, limit: number = 10): Promise<ToDoInterface[] | null> => {
    Logger.debug(`ToDoService - findAll - call toDoRepository.findAll with page: ${page} and limit: ${limit}`);
    return this.toDoRepository.findAll(page, limit);
  };

  public updateDescription = async (
    id: string,
    body: string
  ): Promise<void> => {
    Logger.debug('ToDoService - update - call ToDoService.find');
    await this.findById(id);

    Logger.debug('ToDoService - update - call toDoRepository.update');
    return this.toDoRepository.updateDescription(id, body);
  };

  public updateStatus = async (
    id: string,
    completedStatus: boolean
  ): Promise<void> => {
    Logger.debug('ToDoService - updateStatus - call ToDoService.findById');
    await this.findById(id);

    Logger.debug('ToDoService - updateStatus - call toDoRepository.updateStatus');
    return this.toDoRepository.updateStatus(id, completedStatus);
  };

  public findById = async (id: string): Promise<ToDoInterface | null> => {
    Logger.debug('ToDoService - findById - call toDoRepository.findById');
    return this.toDoRepository.findById(id);
  };

  public delete = async (id: string): Promise<void> => {
    Logger.debug('ToDoService - delete - call toDoRepository.findById');
    await this.findById(id);

    Logger.debug('ToDoService - delete - call toDoRepository.delete');
    return this.toDoRepository.delete(id);
  };

  public completeInBatch = async (ids: string[], completed: boolean): Promise<void> => {
    Logger.debug('ToDoService - completeInBatch - call toDoRepository.completeInBatch');
    await this.toDoRepository.completeInBatch(ids, completed);
  };

  public deleteInBatch = async (ids: string[]): Promise<void> => {
    Logger.debug('ToDoService - deleteInBatch - call toDoRepository.deleteInBatch');
    await this.toDoRepository.deleteInBatch(ids);
  };

  public getTodoCount = async (): Promise<{ pending: number; completed: number }> => {
    const [pending, completed] = await Promise.all([
      this.toDoRepository.countPending(),
      this.toDoRepository.countCompleted(),
    ]);
  
    return { pending, completed };
  };
}

export default ToDoService;
