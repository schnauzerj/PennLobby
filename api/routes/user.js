const express = require("express");
const router = express.Router();
// make sure the name is different from the class instance 
// for example, it cannot be users = require(./users)
const Users = require("../DBOperations/users");
const User = require('../models/User');
// data validator 
const Ajv = require("ajv");

//data validator
const ajv = new Ajv({coerceTypes: true})
const schema = {
  type: "object",
  properties: {
    username: { type: 'string' },
    email: { type: 'string' },
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    hashed_password: { type: 'string' },
    group_ids: { type: 'array' },
    post_ids: { type: 'array' },
    following: { type: 'array' },
    followers: { type: 'array' },
    blocking: { type: 'array' },
    blocked_by: { type: 'array' },
  },
  required: ['username', 'email', 'firstName', 'lastName', 'hashed_password'],
}

// in this file, we will assume the database connection is
// already established and successful

// get all users
router.route("/").get(async (req, res) => {
  try {
    const users = await Users.getUsers(User);
    res.status(200).send(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// add a new user
router.route("/").post(async (req, res) => {
  // console.log(req.body);
  const valid = ajv.validate(schema, req.body);
  if (!valid) {
    res.status(400).json({ error: ajv.errors });
    return;
  }
  try {
    // check if the user already exists in the database
    const exists = await Users.getUserByEmail(User, req.body.email); 
    if (exists) {
      res.status(409).json({ error: 'user email is already in the database' });
      return;
    }
    if (await Users.getUserByUsername(User, req.body.username)) {
      res.status(409).json({ error: 'user username is already in the database' });
      return;
    }
    const result = await Users.addUser(User, req.body);
    res.status(201).send(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// get a user by id
router.route("/:id").get(async (req, res) => {
  try {
    const user = await Users.getUserById(User, req.body._id); 
    res.status(200).send(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// get a user by username
router.route("/:username").get(async (req, res) => {
  try {
    const user = await Users.getUserByUsername(User, req.body.username); 
    res.status(200).send(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// get a user by email
router.route("/:email").get(async (req, res) => {
  try {
    const user = await Users.getUserByEmail(User, req.body.email); 
    res.status(200).send(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// update a user by id
router.route("/:id").put(async (req, res) => {
  try {
    const obj = req.body;
    const { _id, ...rest} = obj;
    // console.log(rest);
    const user = await Users.updateUserById(User, req.body._id, rest);
    res.status(200).send(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// delete a user by id
router.route("/:id").delete(async (req, res) => {
  try {
    const user = await Users.deleteUserById(User, req.body._id);
    res.status(200).send(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;