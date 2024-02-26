"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalError = exports.NotFoundError = exports.ForbiddenError = exports.UnauthorizedError = exports.BadRequestError = exports.ApplicationError = void 0;
class ApplicationError extends Error {
    constructor(code, message, ...args) {
        super(...args);
        this.code = null;
        this.code = code;
        this.message = message;
    }
}
exports.ApplicationError = ApplicationError;
class BadRequestError extends ApplicationError {
    constructor(message, ...args) {
        super(400, message, ...args);
    }
}
exports.BadRequestError = BadRequestError;
class UnauthorizedError extends ApplicationError {
    constructor(message) {
        super(401, message);
    }
}
exports.UnauthorizedError = UnauthorizedError;
class ForbiddenError extends ApplicationError {
    constructor(message, ...args) {
        super(403, message, args);
    }
}
exports.ForbiddenError = ForbiddenError;
class NotFoundError extends ApplicationError {
    constructor(message, ...args) {
        super(404, message, args);
    }
}
exports.NotFoundError = NotFoundError;
class InternalError extends ApplicationError {
    constructor(message, ...args) {
        super(500, message, args);
    }
}
exports.InternalError = InternalError;
//# sourceMappingURL=error.js.map