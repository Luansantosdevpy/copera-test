import { Server } from 'socket.io';

export default interface SocketInterface {
  io: Server;
}