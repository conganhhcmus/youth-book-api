"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const common_1 = require("./constants/common");
const swaggerDefinition = {
    openapi: '3.0.3',
    info: {
        title: 'Youth Books API',
        version: '1.0.0',
    },
    servers: [{ url: `/api/v1` }],
    components: {
        securitySchemes: {
            accessToken: {
                type: 'apiKey',
                in: 'cookie',
                name: common_1.TOKEN_KEY,
            },
            refreshToken: {
                type: 'apiKey',
                in: 'cookie',
                name: common_1.REFRESH_TOKEN_KEY,
            },
        },
    },
};
const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['./src/routers/*.ts', './dist/routers/*.js'],
};
exports.default = (0, swagger_jsdoc_1.default)(options);
//# sourceMappingURL=swagger.js.map