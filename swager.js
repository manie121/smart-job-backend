const swaggerAutogen = require('swagger-autogen');

const doc = {
  swagger: "2.0",
  info: {
    title: 'Smart Job',
    description: 'Auto-generated Swagger docs',
    version: '1.0.0',
  },
  host: 'localhost:6000',
  basePath: '/',
  schemes: ['http'],
  consumes: ['application/json', 'multipart/form-data'],
  produces: ['application/json'],
  definitions: {},
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      description: 'Enter your JWT token in the format: Bearer <token>',
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./app.js']; // Make sure app.js exists in this path

swaggerAutogen(outputFile, endpointsFiles, doc)
  .then(() => {
    console.log('Swagger documentation generated successfully!');
  });
