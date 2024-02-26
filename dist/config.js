"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SWAGGER_CSS_URL = exports.ATLAS_URI = exports.NODE_ENV = exports.REFRESH_TOKEN_SECRET_KEY = exports.TOKEN_SECRET_KEY = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.PORT = parseInt(process.env.PORT, 10) || 8080;
exports.TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY;
exports.REFRESH_TOKEN_SECRET_KEY = process.env.REFRESH_TOKEN_SECRET_KEY;
exports.NODE_ENV = process.env.NODE_ENV;
exports.ATLAS_URI = process.env.ATLAS_URI.replace('{NODE_ENV}', exports.NODE_ENV);
exports.SWAGGER_CSS_URL = process.env.SWAGGER_CSS_URL || null;
//# sourceMappingURL=config.js.map