import winston from 'winston';

const {
  combine, timestamp, label, printf, colorize,
} = winston.format;

class Logger {
  constructor() {
    this.myFormat = printf((info) => {
      if (info instanceof Error) {
        return `${info.timestamp} [${info.label}] ${info.level}: ${info.message} ${info.stack}`;
      }
      return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
    });
  }

  logger() {
    return winston.createLogger({
      level: 'info',
      format: combine(
        colorize(),
        winston.format.splat(),
        // label({ label: filename}),
        label({ label: '' }),
        timestamp(),
        this.myFormat,
      ),
      transports: [
        //
        // - Write to all logs with level `info` and below to `combined.log`
        // - Write all logs error (and below) to `error.log`.
        //
        new winston.transports.Console(),
        // new winston.transports.File({ filename: path.join(os.tmpdir(), "test", "test.log"),
        // level: "info" })
      ],
    });
  }
}

export default Logger;
