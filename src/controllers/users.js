import { v4 as uuidv4 } from 'uuid';

//DEFAULT USERS
let users = [
  { id: '1', name: 'John', status: 'user' },
  { id: '2', name: 'Mike', status: 'moderator' },
  { id: '3', name: 'Timmy', status: 'admin' },
];

//GET ALL USERS CONTROLLER
export const getAllUsers = (req, reply) => {
  try {
    reply.code(200).send(users);
  } catch (error) {
    console.log(error);
  }
};

//GET SINGLE USER CONTROLLER
export const getUser = (req, reply) => {
  try {
    const { id } = req.params;

    const user = users.find(user => user.id === id);

    reply.code(200).send(user);
  } catch (error) {
    console.log(error);
  }
};

//CREATE USER CONTROLLER
export const createUser = (req, reply) => {
  try {
    const { name, status } = req.body;

    if (!name || !status) {
      reply.code(400).send({ message: 'Bad request' });
    }

    const user = { id: uuidv4(), name, status };

    users.push(user);

    const replyObject = {
      message: 'New user has been created',
      user,
    };

    reply.code(200).send(replyObject);
  } catch (error) {
    console.log(error);
  }
};

//UPDATE USER CONTROLLER
export const updateUser = (req, reply) => {
  try {
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
  } catch (error) {
    console.log(error);
  }
};

//DELETE USER CONTROLLER
export const deleteUser = (req, reply) => {
  try {
    const { id } = req.params;

    const user = users.find(user => user.id === id);

    users = users.filter(user => user.id !== id);

    const replyObject = {
      message: 'User has been deleted',
      deletedUser: user,
    };

    reply.code(200).send(replyObject);
  } catch (error) {
    console.log(error);
  }
};
