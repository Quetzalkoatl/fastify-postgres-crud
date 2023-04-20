import {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/users.js';

//USERS ROUTES
export const usersRoutes = (fastify, options, done) => {
  //GET ALL USERS
  fastify.get('/users', getAllUsers);

  //GET SINGLE USER
  fastify.get('/users/:id', getUser);

  //CREATE USER
  fastify.post('/users', createUser);

  //UPDATE USER
  fastify.put('/users/:id', updateUser);

  //DELETE USER
  fastify.delete('/users/:id', deleteUser);

  done();
};
