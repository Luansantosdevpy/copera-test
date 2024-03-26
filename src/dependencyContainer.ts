import { DependencyContainer } from 'tsyringe';
import Logger from './infrastructure/log/logger';
import HealthCheckRepositoryInterface from './domain/interfaces/repositories/healthCheckRepositoryInterface';
import PostgresHealthCheckRepository from './infrastructure/data/repositories/healthCheckRepository';
import HealthCheckService from './application/services/healthCheckService';
import ToDoRepositoryInterface from './domain/interfaces/repositories/toDoRepositoryInterface';
import ToDoRepository from './infrastructure/data/repositories/toDoRepository';
import ToDoService from './application/services/toDoService';

export default async (container: DependencyContainer): Promise<void> => {
  Logger.debug('Dependency container initializing...');

  container.register<HealthCheckRepositoryInterface>(
    'HealthCheckRepositoryInterface',
    {
      useClass: PostgresHealthCheckRepository
    }
  );

  container.register<HealthCheckService>('HealthCheckService', {
    useClass: HealthCheckService
  });

  container.register<ToDoRepositoryInterface>(
    'ToDoRepositoryInterface',
    {
      useClass: ToDoRepository
    }
  );

  container.register<ToDoService>('ToDoService', {
    useClass: ToDoService
  });

  Logger.debug('Dependency container initialized!');
};
