import { inject, injectable } from 'tsyringe';
import { Request, Response } from 'express';
import { Server as SocketIOServer, Socket as SocketIOSocket } from 'socket.io';
import { HttpStatusCode } from 'axios';
import { validationResult } from 'express-validator';
import Logger from '../../infrastructure/log/logger';
import ValidationError from '../../application/exceptions/validationError';
import NotFoundError from '../../application/exceptions/notFoundError';
import ToDoInterface from '../../domain/interfaces/modelInterfaces/toDoInterface';
import ToDoService from '../../application/services/toDoService';

@injectable()
export default class ToDoController {
  constructor(
    @inject(ToDoService)
    public readonly toDoService: ToDoService,
    private readonly io: SocketIOServer
  ) {}
  public findAll = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    try {
      const page: number = parseInt(request.query.page as string, 10) || 1;
      const limit: number = parseInt(request.query.limit as string, 10) || 10;

      Logger.debug(`ToDoController - findAll - call toDoService.findAll with page: ${page} and limit: ${limit}`);

      const toDos: ToDoInterface[] | null = await this.toDoService.findAll(page, limit);

      return response.status(HttpStatusCode.Ok).json({ data: toDos });
    } catch (error) {
      Logger.error(`ToDoController - findAll - error: ${error}`);
      return response
        .status(HttpStatusCode.InternalServerError)
        .json({ error: 'Internal Server Error.' });
    }
  };

  public create = async (req: Request, res: Response): Promise<Response> => {
    try {
      Logger.debug('ToDoController - create - validate payload');
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res
          .status(HttpStatusCode.UnprocessableEntity)
          .send(errors.array());
      }

      Logger.debug('ToDoController - create - call toDoService.create');
      const toDo = await this.toDoService.create(req.body);

      this.io.emit('nova-tarefa', toDo);

      return res.status(HttpStatusCode.Ok).json({ data: toDo });
    } catch (error) {
      Logger.error(`ToDoController - create - error: ${error}`);
      if (error instanceof ValidationError) {
        return res
          .status(HttpStatusCode.UnprocessableEntity)
          .json({ error: error.message });
      }

      return res
        .status(HttpStatusCode.InternalServerError)
        .json({ error: 'Internal Server Error.' });
    }
  };

  public findById = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    try {
      Logger.debug('ToDoController - find - validate id');
      const errors = validationResult(request);

      if (!errors.isEmpty()) {
        return response
          .status(HttpStatusCode.UnprocessableEntity)
          .send(errors.array());
      }

      const { id } = request.params;

      Logger.debug('ToDoController - find - call toDoService.find');
      const toDo = await this.toDoService.findById(id);

      return response.status(HttpStatusCode.Ok).json({ data: toDo });
    } catch (error) {
      Logger.error(`ToDoController - find - error: ${error}`);

      if (error instanceof NotFoundError) {
        return response
          .status(HttpStatusCode.NotFound)
          .json({ error: error.message });
      }

      return response
        .status(HttpStatusCode.InternalServerError)
        .json({ error: 'Internal Server Error.' });
    }
  };

  public updateDescription = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    try {
      Logger.debug('ToDoController - update - validate payload');
      const errors = validationResult(request);

      if (!errors.isEmpty()) {
        return response
          .status(HttpStatusCode.UnprocessableEntity)
          .send(errors.array());
      }

      const { id } = request.params;
      const { body } = request.body;

      Logger.debug('ToDoController - update - call toDoService.update');
      await this.toDoService.updateDescription(id, body);

      this.io.emit('atualizacao-descricao-tarefa', { id, descricao: body });

      return response.status(HttpStatusCode.NoContent).send();
    } catch (error) {
      Logger.error(`ToDoController - update - error: ${error}`);

      if (error instanceof NotFoundError) {
        return response
          .status(HttpStatusCode.NotFound)
          .json({ error: error.message });
      }

      if (error instanceof ValidationError) {
        return response
          .status(HttpStatusCode.UnprocessableEntity)
          .json({ error: error.message });
      }

      return response
        .status(HttpStatusCode.InternalServerError)
        .json({ error: 'Internal Server Error.' });
    }
  };

  public updateStatus = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    try {
      Logger.debug('ToDoController - updateStatus - validate payload');
      const errors = validationResult(request);

      if (!errors.isEmpty()) {
        return response
          .status(HttpStatusCode.UnprocessableEntity)
          .send(errors.array());
      }

      const { id } = request.params;
      const { completed } = request.body;

      Logger.debug('ToDoController - updateStatus - call toDoService.updateStatus');
      await this.toDoService.updateStatus(id, completed);

      this.io.emit('atualizacao-status-tarefa', { id, status: completed });

      return response.status(HttpStatusCode.NoContent).send();
    } catch (error) {
      Logger.error(`ToDoController - updateStatus - error: ${error}`);

      if (error instanceof NotFoundError) {
        return response
          .status(HttpStatusCode.NotFound)
          .json({ error: error.message });
      }

      if (error instanceof ValidationError) {
        return response
          .status(HttpStatusCode.UnprocessableEntity)
          .json({ error: error.message });
      }

      return response
        .status(HttpStatusCode.InternalServerError)
        .json({ error: 'Internal Server Error.' });
    }
  };

  public delete = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    try {
      Logger.debug('ToDoController - delete - validate id');
      const errors = validationResult(request);

      if (!errors.isEmpty()) {
        return response
          .status(HttpStatusCode.UnprocessableEntity)
          .send(errors.array());
      }

      const { id } = request.params;

      Logger.debug('ToDoController - delete - call toDoService.delete');
      await this.toDoService.delete(id);

      this.io.emit('deletando-tarefa', { id });

      return response.status(HttpStatusCode.NoContent).send();
    } catch (error) {
      Logger.error(`ToDoController - delete - error: ${error}`);

      if (error instanceof NotFoundError) {
        return response
          .status(HttpStatusCode.NotFound)
          .json({ error: error.message });
      }

      return response
        .status(HttpStatusCode.InternalServerError)
        .json({ error: 'Internal Server Error.' });
    }
  };

  public completeInBatch = async (request: Request, response: Response): Promise<Response> => {
    try {
      const errors = validationResult(request);
      const { ids, completed } = request.body;
  
      if (!errors.isEmpty()) {
        return response.status(HttpStatusCode.UnprocessableEntity).json({ errors: errors.array() });
      }
  
      Logger.debug('ToDoController - completeInBatch - call toDoService.completeInBatch');
      await this.toDoService.completeInBatch(ids, completed);

      this.io.emit('conclusao-tarefas-em-lote', { ids, completed });
  
      return response.status(HttpStatusCode.Ok).send();
    } catch (error) {
      Logger.error(`ToDoController - completeInBatch - error: ${error}`);
      if (error instanceof ValidationError) {
        return response.status(HttpStatusCode.UnprocessableEntity).json({ error: error.message });
      }
      return response.status(HttpStatusCode.InternalServerError).json({ error: 'Internal Server Error.' });
    }
  };

  public deleteInBatch = async (request: Request, response: Response): Promise<Response> => {
    try {
      const errors = validationResult(request);
      const { ids } = request.body;
  
      if (!errors.isEmpty()) {
        return response.status(HttpStatusCode.UnprocessableEntity).json({ errors: errors.array() });
      }
  
      Logger.debug('ToDoController - deleteInBatch - call toDoService.deleteInBatch');
      await this.toDoService.deleteInBatch(ids);

      this.io.emit('exclusao-tarefas-em-lote', { ids });
  
      return response.status(HttpStatusCode.Ok).send();
    } catch (error) {
      Logger.error(`ToDoController - deleteInBatch - error: ${error}`);
      if (error instanceof ValidationError) {
        return response.status(HttpStatusCode.UnprocessableEntity).json({ error: error.message });
      }
      return response.status(HttpStatusCode.InternalServerError).json({ error: 'Internal Server Error.' });
    }
  };

  public getTodoCount = async (request: Request, response: Response): Promise<Response> => {
    try {
      Logger.debug('ToDoController - getTodoCount - call toDoService.getTodoCount');
      const { pending, completed } = await this.toDoService.getTodoCount();
  
      return response.status(HttpStatusCode.Ok).json({ data: { pending, completed } });
    } catch (error) {
      Logger.error(`ToDoController - getTodoCount - error: ${error}`);
      return response.status(HttpStatusCode.InternalServerError).json({ error: 'Internal Server Error.' });
    }
  };
}
