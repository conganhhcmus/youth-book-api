"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("../types/error");
const logger_1 = __importDefault(require("../helpers/logger"));
const mongodb_1 = require("mongodb");
const jsonwebtoken_1 = require("jsonwebtoken");
function default_1(app) {
    // If you are lost
    app.use(() => {
        throw new error_1.NotFoundError('You are lost');
    });
    // Request error handler
    app.use((error, _req, res, next) => {
        if (error instanceof error_1.ApplicationError) {
            logger_1.default.error(error === null || error === void 0 ? void 0 : error.message, error.stack);
            if (error.message) {
                return res.status(error.code).send(error.message);
            }
            else {
                return res.sendStatus(error.code);
            }
        }
        next(error);
    });
    // Log all errors
    app.use(function (err, req, res, next) {
        const userString = 'unknown user';
        if (err instanceof mongodb_1.MongoError) {
            if (err.code === 11000) {
                logger_1.default.error(`${req.method} ${req.path}: MongoDB duplicate entry from ${userString}`);
            }
            else {
                logger_1.default.error(`${req.method} ${req.path}: Unhandled MongoDB error ${userString}. ${err.errmsg}`);
            }
            if (!res.headersSent) {
                return res.sendStatus(500);
            }
        }
        if (err instanceof jsonwebtoken_1.JsonWebTokenError) {
            logger_1.default.error(err === null || err === void 0 ? void 0 : err.message, err.stack);
            if (err.message) {
                return res.status(401).send(err.message);
            }
            else {
                return res.sendStatus(401);
            }
        }
        else if (err instanceof Error) {
            logger_1.default.error(`${req.method} ${req.path}: Unhandled request error ${userString}. ${err.message}`);
        }
        else if (typeof err === 'string') {
            logger_1.default.error(`${req.method} ${req.path}: Unhandled request error ${userString}. ${err}`);
        }
        next(err);
    });
    // Optional fallthrough error handler
    app.use(function (err, _req, res, _next) {
        res.statusCode = 500;
        res.end(err.message + '\n');
    });
}
exports.default = default_1;
//# sourceMappingURL=errorHandler.js.map