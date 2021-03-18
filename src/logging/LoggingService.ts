import * as winston from "winston"
import { ILoggingService } from "./LoggingService.interface"

export class LoggingService implements ILoggingService {
  logger: winston.Logger

  constructor(level: string = "info") {
    this.logger = winston.createLogger({
      level: level,
      format: winston.format.json(),
      transports: [
        new winston.transports.Console()
      ]
    })
  }

  public debug(message: string): void {
    this.logger.log('debug', message)
  }

  public error(message: string): void {
    this.logger.log('error', message)
  }

  public info(message: string): void {
    this.logger.log('info', message)
  }

  public warn(message: string): void {
    this.logger.log('warn', message)
  }
}
