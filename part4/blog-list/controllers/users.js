const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.post('/', async (req, res) => {
  const body = req.body;

  if (!(body.username && body.password)) {
    return res.status(400).send({ error: '`username` or `password` not specified' });
  }

  if (body.password.length < 3) {
    return res.status(400).send({ error: '`password` must be atleast 3 characters long' });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);
  const newUser = new User({
    username: body.username,
    name: body.name || body.username,
    passwordHash,
  });

  const savedUser = await newUser.save();
  return res.status(201).json(savedUser);
});

module.exports = usersRouter;
