import swaggerJSDoc, { OAS3Definition } from 'swagger-jsdoc';
import { REFRESH_TOKEN_KEY, TOKEN_KEY } from '@/constants/common';

const swaggerDefinition: OAS3Definition = {
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
                in: 'header',
                name: TOKEN_KEY,
            },
            refreshToken: {
                type: 'apiKey',
                in: 'header',
                name: REFRESH_TOKEN_KEY,
            },
        },
    },
};

const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['./src/routers/*.ts', './dist/routers/*.js'],
};

export default swaggerJSDoc(options);
