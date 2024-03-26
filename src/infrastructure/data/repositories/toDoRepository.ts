import { injectable } from 'tsyringe';
import Logger from '../../log/logger';
import ToDoInterface from '../../../domain/interfaces/modelInterfaces/toDoInterface';
import ToDoModel from '../../../domain/models/toDo';
import ToDoRepositoryInterface from '../../../domain/interfaces/repositories/toDoRepositoryInterface';

@injectable()
export default class ToDoRepository implements ToDoRepositoryInterface {
  public save = async (toDo: Partial<ToDoInterface>): Promise<ToDoInterface> => {
    Logger.debug(
      `ToDoRepository - create - execute [toDo: ${toDo}]`
    );
    const newToDo = await ToDoModel.create({
      ...toDo,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return newToDo;
  };

  public findByName = async (name: string): Promise<ToDoInterface | null> => {
    Logger.debug(`ToDoRepository - findByName - name: ${name}`);
    return await ToDoModel.findOne({ name });
  };

  public findAll = async (page: number = 1, limit: number = 10): Promise<ToDoInterface[]> => {
    Logger.debug(`ToDoRepository - findAll - execute with page: ${page} and limit: ${limit}`);
    return ToDoModel.find()
      .sort({ name: 1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
  };

  public delete = async (id: string): Promise<void> => {
    Logger.debug(`ToDoRepository - delete - execute [id: ${id}]`);
    await ToDoModel.deleteOne({ _id: id });
  };

  public updateDescription = async (
    id: string,
    body: string
  ): Promise<void> => {
    Logger.debug(
      `ToDoRepository - update - execute [id: ${id}]`
    );
    await ToDoModel.updateOne(
      { _id: id },
      {
        body: body,
        updatedAt: new Date(),
      }
    );
  };

  public updateStatus = async (
    id: string,
    completedStatus: boolean
  ): Promise<void> => {
    Logger.debug(
      `ToDoRepository - update - execute [id: ${id}]`
    );
    await ToDoModel.updateOne(
      { _id: id },
      {
        completed: completedStatus,
        updatedAt: new Date(),
      }
    );
  };

  public findById = async (id: string): Promise<ToDoInterface | null> => {
    Logger.debug(`ToDoRepository - findById - execute [id: ${id}]`);
    return await ToDoModel.findById({ _id: id }).exec();
  };
}
