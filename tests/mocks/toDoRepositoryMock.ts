import ToDoRepository from '../../src/infrastructure/data/repositories/toDoRepository';

export default (): ToDoRepository => ({
  save: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
  findByName: jest.fn(),
  updateDescription: jest.fn(),
  updateStatus: jest.fn(),
  delete: jest.fn(),
  completeInBatch: jest.fn(),
  deleteInBatch: jest.fn(),
  countPending: jest.fn(),
  countCompleted: jest.fn()
});