"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = __importDefault(require("./users"));
const auth_1 = __importDefault(require("./auth"));
const router = (0, express_1.Router)();
exports.default = () => {
    /** import all router */
    (0, auth_1.default)(router);
    (0, users_1.default)(router);
    return router;
};
//# sourceMappingURL=index.js.map