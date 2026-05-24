const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (req, res) => {
  const allBlogs = await Blog.find({});
  res.json(allBlogs);
});

blogsRouter.post('/', async (req, res) => {
  const body = req.body;

  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  });

  const returnedBlog = await newBlog.save();
  res.status(201).json(returnedBlog);
});

module.exports = blogsRouter;
