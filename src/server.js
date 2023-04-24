import Fastify from 'fastify';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import * as dotenv from 'dotenv';

import { usersRoutes } from './routes/users.js';

dotenv.config();

export const fastify = Fastify({
  logger: true,
});

//SERVER PORT
const SERVER_PORT = process.env.SERVER_PORT || 5000;

//REGISTER SWAGGER
await fastify.register(fastifySwagger, {
  swagger: {
    info: {
      title: 'Documentation',
      description: 'Fastify CRUD project documentation',
    },
    tags: [{ name: 'User', description: 'User related end-points' }],
    definitions: {
      User: {
        type: 'object',
        required: ['id', 'name', 'status'],
        properties: {
          id: { type: 'string', format: 'uuid' },
          name: { type: 'string' },
          status: { type: 'string' },
        },
      },
    },
  },
});
await fastify.register(fastifySwaggerUi, {
  routePrefix: '/documentation',
  uiConfig: {
    docExpansion: 'list',
    deepLinking: false,
  },
});

// REGISTER USERS ROUTES
fastify.register(usersRoutes, { prefix: '/users' });

await fastify.ready();

//START SERVER
const start = () => {
  try {
    fastify.listen({
      port: SERVER_PORT,
    });
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
