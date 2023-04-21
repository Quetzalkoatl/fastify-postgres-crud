import Fastify from 'fastify';

import { usersRoutes } from './routes/users.js';

export const fastify = Fastify({
  logger: true,
});

//SERVER PORT
const PORT = 5000;

// REGISTER USERS ROUTES
fastify.register(usersRoutes, { prefix: '/users' });

//START SERVER
const start = async () => {
  try {
    await fastify.listen({
      port: PORT,
    });
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
