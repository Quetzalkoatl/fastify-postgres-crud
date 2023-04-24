import { v4 as uuidv4 } from 'uuid';
import db from '../db/db.js';

//GET ALL USERS CONTROLLER
export const getAllUsers = async (req, reply) => {
  const users = await db.query('SELECT * FROM users');

  reply.code(200).send(users.rows);
};

//GET SINGLE USER CONTROLLER
export const getUser = async (req, reply) => {
  const { id } = req.params;

  const user = await db.query('SELECT * FROM users WHERE id = $1', [id]);

  if (!user.rows[0]) {
    reply.code(404).send({ message: 'User does not exist' });
  }

  reply.code(200).send(user.rows[0]);
};

//CREATE USER CONTROLLER
export const createUser = async (req, reply) => {
  const { name, status } = req.body;

  if (!name || !status) {
    reply.code(400).send({ message: 'Bad request' });
  }

  const id = uuidv4();

  const user = await db.query(
    'INSERT INTO users (id, name, status) values($1, $2, $3) RETURNING *',
    [id, name, status]
  );

  const replyObject = {
    message: 'User has been created',
    user: user.rows[0],
  };

  reply.code(201).send(replyObject);
};

//UPDATE USER CONTROLLER
export const updateUser = async (req, reply) => {
  const { id } = req.params;
  const { name, status } = req.body;

  if (!name || !status) {
    reply.code(400).send({ message: 'Bad request' });
  }

  const user = await db.query('SELECT * FROM users WHERE id = $1', [id]);

  if (!user.rows[0]) {
    reply.code(404).send({ message: 'User does not exist' });
  }

  const updatedUser = await db.query(
    'UPDATE users set name = $1, status = $2 WHERE id = $3 RETURNING *',
    [name, status, id]
  );

  const replyObject = {
    message: 'User has been updated',
    user: updatedUser.rows[0],
  };

  reply.code(200).send(replyObject);
};

//DELETE USER CONTROLLER
export const deleteUser = async (req, reply) => {
  const { id } = req.params;

  const user = await db.query('SELECT * FROM users WHERE id = $1', [id]);

  if (!user.rows[0]) {
    reply.code(404).send({ message: 'User does not exist' });
  }

  const deletedUser = await db.query(
    'DELETE FROM users WHERE id = $1 RETURNING *',
    [id]
  );

  const replyObject = {
    message: 'User has been deleted',
    deletedUser: deletedUser.rows[0],
  };

  reply.code(200).send(replyObject);
};
