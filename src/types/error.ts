export class ApplicationError extends Error {
    public code = null;
    constructor(code: number, message: string, ...args) {
        super(...args);
        this.code = code;
        this.message = message;
    }
}

export class BadRequestError extends ApplicationError {
    constructor(message: string, ...args) {
        super(400, message, ...args);
    }
}

export class UnauthorizedError extends ApplicationError {
    constructor(message?: string) {
        super(401, message);
    }
}

export class ForbiddenError extends ApplicationError {
    constructor(message?: string, ...args) {
        super(403, message, args);
    }
}

export class NotFoundError extends ApplicationError {
    constructor(message?: string, ...args) {
        super(404, message, args);
    }
}

export class InternalError extends ApplicationError {
    constructor(message?: string, ...args) {
        super(500, message, args);
    }
}
