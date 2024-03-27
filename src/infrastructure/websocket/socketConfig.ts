import { Server } from 'socket.io';
import http from 'http';
import Logger from '../../infrastructure/log/logger';

const socketConfig = (server: http.Server): Server => {
  const io = new Server(server);

  io.on('connection', (socket) => {
    Logger.info('Client connected:', socket.id);

    socket.on('disconnect', () => {
      Logger.info('Client disconect:', socket.id);
    });
  });

  return io;
};

export default socketConfig;
