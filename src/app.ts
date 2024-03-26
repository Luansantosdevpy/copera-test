import 'reflect-metadata';
import express from 'express';
import http from 'http';
import { Server } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import Logger from './infrastructure/log/logger';
import routes from './api/routes/routes';
import dbConfig from './infrastructure/data/config/database';
import mongoose from 'mongoose';
import dependencyContainer from './dependencyContainer';
import { container } from 'tsyringe';

export default class App {
  public express: express.Application = express();
  private server: Server;
  private io: SocketIOServer;

  public initialize = async (): Promise<void> => {
    await this.connectToMongoDB();
    await this.middlewares();
    await this.dependencyContainer();
    await this.setupWebSocket();
    await this.routes();
  };

  public start = (port: number, appName: string): void => {
    this.server = this.express.listen(port, '0.0.0.0', () => {
      Logger.info(`${appName} listening on port ${port}!`);
    });
  };

  public stop = (): void => {
    this.server.close();
  };

  private middlewares = async (): Promise<void> => {
    this.express.use(express.json());
  };

  private async connectToMongoDB(): Promise<void> {
    try {
      const { uri, options } = dbConfig;
      await mongoose.connect(uri, options);
      Logger.info('Connected to MongoDB');
    } catch (error) {
      Logger.error('Error connecting to MongoDB:', error);
      process.exit(1);
    }
  }

  private dependencyContainer = async (): Promise<void> => {
    await dependencyContainer(container);
  };

  private setupWebSocket = async (): Promise<void> => {
    this.server = http.createServer(this.express);
    this.io = new SocketIOServer(this.server);

    this.io.on('connection', (socket) => {
      Logger.info('Client connected');

      socket.on('disconnect', () => {
        Logger.info('Client disconnected');
      });
    });
  };

  private routes = async (): Promise<void> => {
    this.express.use(await routes());
  };
}
