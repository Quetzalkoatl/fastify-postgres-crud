import {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/users.js';

//USER SCHEMA
const User = {
  type: 'object',
  properties: {
    id: { type: 'string', description: 'User ID' },
    name: { type: 'string', description: 'User name' },
    status: { type: 'string', description: 'User status' },
  },
};

//USERS ROUTES
export const usersRoutes = (fastify, options, done) => {
  //GET ALL USERS
  fastify.get('/', {
    schema: {
      description: 'GET ALL USERS',
      tags: ['User'],
      response: {
        200: {
          type: 'array',
          items: User,
        },
      },
    },
    handler: getAllUsers,
  });

  //GET SINGLE USER
  fastify.get('/:id', {
    schema: {
      description: 'GET SINGLE USER',
      tags: ['User'],
      response: {
        200: User,
      },
    },
    handler: getUser,
  });

  //CREATE USER
  fastify.post('/', {
    schema: {
      description: 'CREATE USER',
      tags: ['User'],
      body: {
        type: 'object',
        required: ['name', 'status'],
        properties: User.properties,
      },
      response: {
        201: {
          type: 'object',
          properties: {
            message: { type: 'string' },
            user: User,
          },
        },
      },
    },
    handler: createUser,
  });

  //UPDATE USER
  fastify.put('/:id', {
    schema: {
      description: 'UPDATE USER',
      tags: ['User'],
      body: {
        type: 'object',
        properties: User.properties,
      },
      response: {
        200: {
          type: 'object',
          properties: {
            message: { type: 'string' },
            user: User,
          },
        },
      },
    },
    handler: updateUser,
  });

  //DELETE USER
  fastify.delete('/:id', {
    schema: {
      description: 'DELETE USER',
      tags: ['User'],
      response: {
        200: {
          type: 'object',
          properties: {
            message: { type: 'string' },
            deletedUser: User,
          },
        },
      },
    },
    handler: deleteUser,
  });

  done();
};
