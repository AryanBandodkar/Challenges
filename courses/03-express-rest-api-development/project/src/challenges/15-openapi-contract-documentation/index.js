import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User API',
      version: '1.0.0',
    },
  },
  apis: [],
};

const swaggerSpec = swaggerJsdoc(options);

export function solve_15_openapi_contract_documentation() {
  return {
    swaggerUi,
    swaggerSpec,
    route: {
      path: '/users',
      method: 'GET',
      response: {
        200: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'integer' },
              name: { type: 'string' },
              email: { type: 'string' },
            },
          },
        },
      },
    },
  };
}