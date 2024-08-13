import express from 'express';
import connectDB from "./db";
import routes from './routes/routes';
import dotenv from 'dotenv';
import cors from "cors";
import http from 'http';
import { Server } from 'socket.io';
import { setupSocketHandlers } from './socketHandlers/socketHandlers';
import { apiErrorMiddleware } from './middlewares/error-middleware';

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));



app.use('/api', routes);
app.use(apiErrorMiddleware);

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  }
});


setupSocketHandlers(io);

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
