import { levels } from './winston.config'
import winston from 'winston'

export class TestLogger {
    constructor(private readonly logger: winston.Logger) {}

    log(message: string, level: keyof typeof levels = 'info'): void {
        this.logger.log(level, message)
    }

    error(message: string, error?: Error): void {
        this.logger.error(message, error)
    }

    warn(message: string): void {
        this.logger.warn(message)
    }

    debug(message: string): void {
        this.logger.debug(message)
    }
}
