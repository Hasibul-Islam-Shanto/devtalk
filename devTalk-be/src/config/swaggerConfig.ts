import swaggerJSDoc from 'swagger-jsdoc';
import { swaggerPaths } from './swagger.paths';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'API documentation for my Express app',
    },
    servers: [
      {
        url: '/',
        description: 'Current origin',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    paths: { ...swaggerPaths },
  },
  apis: [] as string[],
};

export const swaggerSpec = swaggerJSDoc(options);
