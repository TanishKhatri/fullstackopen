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

blogsRouter.delete('/:id', async (req, res) => {
  const id = req.params.id;

  await Blog.findByIdAndDelete(id);
  res.status(204).end();
});

blogsRouter.put('/:id', async (req, res) => {
  const newContent = req.body;
  const id = req.params.id;

  const blog = await Blog.findById(id);
  if (!blog) {
    return res.status(404).end();
  }

  blog.title = newContent.title;
  blog.author = newContent.author;
  blog.url = newContent.url;
  blog.likes = newContent.likes;

  const updatedBlog = await blog.save();
  return res.json(updatedBlog);
});

module.exports = blogsRouter;
