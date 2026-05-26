const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (req, res) => {
  const allBlogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 });
  res.json(allBlogs);
});

blogsRouter.post('/', async (req, res) => {
  const body = req.body;

  const userId = body.userId;
  if (!userId) {
    return res.status(400).send({ error: 'userId missing' });
  }

  const theUser = await User.findById(userId);
  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: theUser._id,
  });

  const returnedBlog = await newBlog.save();
  theUser.blogs = theUser.blogs.concat(returnedBlog._id);
  await theUser.save();
  return res.status(201).json(returnedBlog);
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
