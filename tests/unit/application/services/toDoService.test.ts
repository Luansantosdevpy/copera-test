import faker from 'faker';
import { v4 as uuidv4 } from 'uuid';
import toDoRepositoryMock from '../../../mocks/toDoRepositoryMock';
import ToDoService from '../../../../src/application/services/toDoService';
import Logger from '../../../../src/infrastructure/log/logger';
import ToDoRepositoryInterface from '../../../../src/domain/interfaces/repositories/toDoRepositoryInterface';
import ToDoInterface from '../../../../src/domain/interfaces/modelInterfaces/toDoInterface';
import ToDo from '../../../../src/domain/models/toDo';

describe('ToDoService Testing', () => {
  let toDoService: ToDoService;
  let toDoRepository: ToDoRepositoryInterface;
  let loggerErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    toDoRepository = toDoRepositoryMock();
    toDoService = new ToDoService(toDoRepository);
    loggerErrorSpy = jest.spyOn(Logger, 'error');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new toDo', async () => {
    const id = uuidv4();
    const toDo = new ToDo({
      id,
      body: 'testing task',
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    jest.spyOn(toDoRepository, 'save').mockResolvedValue(toDo);
    await toDoService.create(toDo);

    expect(toDoRepository.save).toHaveBeenCalledTimes(1);
    expect(toDoRepository.save).toHaveBeenCalledWith(toDo);
  });

  it('should get the list of toDos with pagination', async () => {
    const page = 1;
    const limit = 10;
    const mockedToDos: ToDoInterface[] = Array(limit).fill({ id: uuidv4(), body: 'test', completed: true } as Partial<ToDoInterface>);

    jest.spyOn(toDoRepository, 'findAll').mockResolvedValue(mockedToDos);
    const result = await toDoService.findAll(page, limit);

    expect(toDoRepository.findAll).toHaveBeenCalledTimes(1);
    expect(toDoRepository.findAll).toHaveBeenCalledWith(page, limit);
    expect(result).toEqual(mockedToDos);
    expect(result).toHaveLength(limit);
  });

  it('should update a ToDo description by id', async () => {
    const toDoId = '66041b03ae44c5744dd2c9f9';
    const newBody = 'new description';

    const updatedToDo: Partial<ToDoInterface> = {
      id: toDoId,
      body: newBody,
      completed: false,
      completedAt: undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
      $assertPopulated: jest.fn(),
      $clone: jest.fn(),
    };

    jest.spyOn(toDoRepository, 'findById').mockResolvedValue(Promise.resolve(updatedToDo as ToDoInterface));

    await toDoService.updateDescription(toDoId, newBody);

    expect(toDoRepository.findById).toHaveBeenCalledTimes(1);
    expect(toDoRepository.findById).toHaveBeenCalledWith(toDoId);
    expect(toDoRepository.updateDescription).toHaveBeenCalledTimes(1);
  });

  it('should find the total number of toDos, pending and completed', async () => {
    const mockCounts = {
      pending: 1,
      completed: 2,
    };

    jest.spyOn(toDoRepository, 'countPending').mockResolvedValue(mockCounts.pending);
    jest.spyOn(toDoRepository, 'countCompleted').mockResolvedValue(mockCounts.completed);
    const results = await toDoService.getTodoCount();
    expect(results).toEqual(mockCounts);
    expect(toDoRepository.countPending).toHaveBeenCalledTimes(1);
    expect(toDoRepository.countCompleted).toHaveBeenCalledTimes(1);
  });
});