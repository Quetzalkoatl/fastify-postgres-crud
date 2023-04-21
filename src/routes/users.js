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
    id: { type: 'string' },
    name: { type: 'string' },
    status: { type: 'string' },
  },
};

//USERS ROUTES
export const usersRoutes = (fastify, options, done) => {
  //GET ALL USERS
  fastify.get('/', {
    schema: {
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
      response: {
        200: User,
      },
    },
    handler: getUser,
  });

  //CREATE USER
  fastify.post('/', {
    schema: {
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
