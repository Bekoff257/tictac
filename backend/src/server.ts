import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { env } from '@/config/env.js';
import { rateLimit } from '@/middleware/rateLimit.js';
import { router } from '@/api/routes.js';
import { applyMove, createInitialState } from '@/domain/game/tictactoe.js';

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(rateLimit());
app.use('/', router);

const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });

const matches = new Map<string, ReturnType<typeof createInitialState>>();

io.on('connection', (socket) => {
  socket.on('join:room', (roomId: string) => {
    socket.join(roomId);
    if (!matches.has(roomId)) matches.set(roomId, createInitialState());
    io.to(roomId).emit('match:update', matches.get(roomId));
  });

  socket.on('move:play', ({ roomId, player, index }) => {
    const state = matches.get(roomId) ?? createInitialState();
    try {
      const next = applyMove(state, player, index);
      matches.set(roomId, next);
      io.to(roomId).emit('match:update', next);
    } catch (error) {
      socket.emit('match:error', { message: (error as Error).message });
    }
  });
});

httpServer.listen(Number(env.PORT), () => {
  console.log(`Backend listening on ${env.PORT}`);
});
