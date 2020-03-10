import Logger from './logger';
import errors from './errors';

const logger = new Logger().logger();


class Send {
  static success(res, statusCode, data = {}) {
    res.status(statusCode).json({ status: 'success', data });
  }

  static error(res, err) {
    logger.error(err);
    if (err instanceof errors.OperationNotAllowedError) {
      const errs = [];
      errs.push(err.message);
      res.status(400).json({ error: errs, status: 'error' });
    } else if (err instanceof errors.ResourceNotFoundError) {
      res.status(404).json({ error: err.message, status: 'error' });
    } else if (err instanceof errors.AuthenticationError
        || err instanceof errors.AuthorizationError) {
      res.status(401).json({ error: err.message, status: 'error' });
    } else if (err instanceof errors.ForbiddenError) {
      res.status(403).json({error: err.message, status: 'error'});
    } else {
      res.status(500).json({
        error: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message,
        status: 'error',
      });
    }
  }
}

export default Send;
