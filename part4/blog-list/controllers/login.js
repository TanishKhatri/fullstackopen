const jwt = require('jsonwebtoken');
const loginRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return res.status(401).send({ error: 'username or password is incorrect' });
  }

  const forUserToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(forUserToken, process.env.JWT_SECRET, { expiresIn: 3600 });

  return res.status(200).send({
    token, username: user.username, name: user.name, id: user._id,
  });
});

module.exports = loginRouter;
