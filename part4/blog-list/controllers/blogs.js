const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', (req, res, next) => {
  Blog.find({}).then((blog) => {
    res.json(blog);
  }).catch((error) => next(error));
});

blogsRouter.post('/', (req, res, next) => {
  const body = req.body;

  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  });

  newBlog.save().then((returnedBlog) => {
    res.json(returnedBlog);
  }).catch((error) => next(error));
});

module.exports = blogsRouter;
