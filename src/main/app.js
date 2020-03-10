/**
 * Setup express
 */
import express from 'express';

/**
 * Setup Morgan
 */
import morgan from 'morgan';

/**
 *
 * Use gzip compression
 */
import compression from 'compression';

/**
 *
 * Use Helmet to setup http headers correctly
 */
import helmet from 'helmet';

/**
 * Setup body parser
 */
import bodyParser from 'body-parser';

/**
 * Setup CORS
 */
import cors from 'cors';

/**
 * rate limiter
 */
import rateLimit from 'express-rate-limit';

/**
 * Routes
 */
import routes from './routes';

const app = express();

app.use(morgan('combined'));

app.use(compression());

app.use(helmet());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const corsOptions = {
  // origin: 'http://localhost:4200'
};
app.use(cors(corsOptions));
// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1);

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
});
app.use('/api/', apiLimiter);

app.use('/api/v1/', routes);

// import etag from 'etag';
// res.setHeader('ETag', etag(body));

export default app;
