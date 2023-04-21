import { v4 as uuidv4 } from 'uuid';

//DEFAULT USERS
let users = [
  { id: '1', name: 'John', status: 'user' },
  { id: '2', name: 'Mike', status: 'moderator' },
  { id: '3', name: 'Timmy', status: 'admin' },
];

//GET ALL USERS CONTROLLER
export const getAllUsers = (req, reply) => {
  reply.code(200).send(users);
};

//GET SINGLE USER CONTROLLER
export const getUser = (req, reply) => {
  const { id } = req.params;

  const user = users.find(user => user.id === id);

  reply.code(200).send(user);
};

//CREATE USER CONTROLLER
export const createUser = (req, reply) => {
  const { name, status } = req.body;

  if (!name || !status) {
    reply.code(400).send({ message: 'Bad request' });
  }

  const user = { id: uuidv4(), name, status };

  users.push(user);

  const replyObject = {
    message: 'User has been created',
    user,
  };

  reply.code(201).send(replyObject);
};

//UPDATE USER CONTROLLER
export const updateUser = (req, reply) => {
  const { id } = req.params;
  const { name, status } = req.body;

  if (!name || !status) {
    reply.code(400).send({ message: 'Bad request' });
  }

  const user = users.find(user => user.id === id);

  if (!user) {
    reply.code(400).send({ message: 'User does not exist' });
  }

  users = users.map(user =>
    user.id === id ? { ...user, name, status } : user
  );

  const updatedUser = users.find(user => user.id === id);

  const replyObject = {
    message: 'User has been updated',
    user: updatedUser,
  };

  reply.code(200).send(replyObject);
};

//DELETE USER CONTROLLER
export const deleteUser = (req, reply) => {
  const { id } = req.params;

  const user = users.find(user => user.id === id);

  if (!user) {
    reply.code(400).send({ message: 'User does not exist' });
  }

  users = users.filter(user => user.id !== id);

  const replyObject = {
    message: 'User has been deleted',
    deletedUser: user,
  };

  reply.code(200).send(replyObject);
};
