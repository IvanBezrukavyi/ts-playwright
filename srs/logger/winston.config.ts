import winston = require('winston')
import DailyRotateFile = require('winston-daily-rotate-file')

export const levels = {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3
}

export const logger = winston.createLogger({
    levels: levels,
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize({
                    colors: {
                        error: 'red',
                        warn: 'yellow',
                        info: 'magenta',
                        debug: 'blue'
                    }
                }),
                winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                winston.format.printf((error) => `${error.timestamp} - ${error.level}: ${error.message}`),
                winston.format.printf((warn) => `${warn.timestamp} - ${warn.level}: ${warn.message}`),
                winston.format.printf((info) => `${info.timestamp} - ${info.level}: ${info.message}`),
                winston.format.printf((debug) => `${debug.timestamp} - ${debug.level}: ${debug.message}`)
            )
        }),
        new DailyRotateFile({
            filename: 'logs/test-run-%DATE%.log',
            level: 'info',
            maxFiles: '14d',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true
        })
    ]
})
