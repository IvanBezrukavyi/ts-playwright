import winston from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'

interface Level {
    error: number
    warn: number
    info: number
    debug: number
}

export const levels: Level = {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3
}

const formatMessage = (info) => {
    const { timestamp, level, message } = info
    return `${timestamp} - ${level}: ${message}`
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
                winston.format.printf(formatMessage)
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
