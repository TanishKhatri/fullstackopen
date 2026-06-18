const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const { userExtractor } = require('../utils/middleware');

blogsRouter.get('/', async (req, res) => {
  const allBlogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 });
  res.json(allBlogs);
});

blogsRouter.post('/', userExtractor, async (req, res) => {
  const body = req.body;

  const theUser = req.user;
  if (!theUser) {
    return res.status(401).json({ error: 'User doesnt exist or authorization header not specified' });
  }

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
  await returnedBlog.populate('user', { username: 1, name: 1 });
  return res.status(201).json(returnedBlog);
});

blogsRouter.delete('/:id', userExtractor, async (req, res) => {
  const id = req.params.id;

  const blog = await Blog.findById(id);
  if (!blog) {
    return res.status(400).json({ error: 'provided blogId doesnt exist' });
  }
  const user = req.user;
  if (!user) {
    return res.status(401).json({ error: 'User doesnt exist or authorization header not specified' });
  }

  if (user._id.toString() !== blog.user.toString()) {
    return res.status(400).json({ error: 'User doesnt have access to delete this blog' });
  }

  await blog.deleteOne();
  return res.status(204).end();
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
  await updatedBlog.populate('user', { username: 1, name: 1 });
  return res.json(updatedBlog);
});

module.exports = blogsRouter;
