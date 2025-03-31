import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import http from 'http';
import morgan from 'morgan';
import { PORT } from './src/configs/environment.config.js';
import connectDB from './src/configs/dbConnection.config.js';
import routes from './src/routes.js';
import requestLogger from './src/middleware/requestLogger.middleware.js';
import cookieParser from './src/middleware/cookieParser.middleware.js';
import logger from './src/utils/logger.util.js';
import { requestTimingLogger } from './src/middleware/requestTimingLogger.middleware.js';
import { socketServer } from './src/configs/socketio.config.js';
const app = express();
const server = http.createServer(app);
const port = PORT || 4004;
app.use(requestLogger());
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser);
app.use(requestTimingLogger);
// Routes
app.use('/api/v1', routes);
socketServer(server);
// Start Server
app.listen(port, async () => {
  await connectDB();
  logger.log(`Server running on http://localhost:${port}`);
});
