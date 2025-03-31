import { Server } from 'socket.io';

export const socketServer = server => {
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:5173',
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', socket => {
    console.log('User connected:', socket.id);
    socket.on('sendMessage', data => {
      io.emit('receiveMessage', data);
    });
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};
