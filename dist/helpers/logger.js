"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const winston_1 = require("winston");
const { combine, label, timestamp, printf } = winston_1.format;
// Make sure this exists
// const LOG_FILE_PATH = 'logs/error.log';
// const file = new transports.File({ filename: LOG_FILE_PATH, level: 'error' });
const console = new winston_1.transports.Console();
const logFormat = printf(({ level, message, label: logLabel, timestamp: logTimestamp }) => {
    return `${logTimestamp} [${logLabel}] ${level}: ${message}`;
});
const logger = (0, winston_1.createLogger)({
    level: process.env.LOG_LEVEL || 'info',
    format: combine(label({ label: config_1.NODE_ENV }), timestamp({
        format: 'DD-MM-YYYY HH:mm:ss',
    }), logFormat),
    transports: [console],
});
// if (NODE_ENV !== 'production') {
//     logger.remove(file);
//     logger.add(console);
// }
exports.default = logger;
//# sourceMappingURL=logger.js.map