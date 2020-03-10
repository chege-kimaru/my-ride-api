/**
 * Setup app root
 */
import path from 'path';
global.appRoot = path.resolve(__dirname);

/**
 * Setup .env
 */
import config from 'dotenv';

/**
 * Custom logger
 */
import http from 'http';
import Logger from './utils/logger';

/**
 * Setup Server
 */
import app from './app';

config.config();
const logger = new Logger().logger();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
server.listen(PORT);
server.on('listening', () => {
  logger.info(`App started on port ${PORT}`);
});
