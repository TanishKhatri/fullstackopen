const {
  test, beforeEach,
  after, describe,
} = require('node:test');
const mongoose = require('mongoose');
const assert = require('node:assert');
const supertest = require('supertest');
const Blog = require('../models/blog');
const app = require('../app');
const helper = require('./apiTestHelper');
const User = require('../models/user');

const api = supertest(app);

describe('Tests for the /api/blogs route', () => {
  describe('Tests that need a preinserted blogsList', () => {
    beforeEach(async () => {
      await Blog.deleteMany({});
      await Blog.insertMany(helper.blogsList);
    });

    test('Getting all blogs work', async () => {
      const result = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);

      assert.deepStrictEqual(result.body.length, helper.blogsList.length);
    });

    test('Unique Identifier is id and not _id', async () => {
      const result = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);

      const listOfAll = result.body;

      assert(Object.hasOwn(listOfAll[0], 'id') && !Object.hasOwn(listOfAll[0], '_id'));
    });

    test('Posting a blog to the database via the api works!', async () => {
      const newBlog = {
        title: 'post test blog',
        author: 'me',
        url: 'some url',
        likes: 24,
      };

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const afterPosting = await helper.getAllBlogs();
      assert.strictEqual(afterPosting.length, helper.blogsList.length + 1);
      assert.partialDeepStrictEqual(afterPosting[afterPosting.length - 1], newBlog);
    });

    test('Can delete a blog', async () => {
      const allBlogs = await helper.getAllBlogs();
      const blog1Id = allBlogs[0].id;

      await api
        .delete(`/api/blogs/${blog1Id}`)
        .expect(204);

      const afterDeletion = await helper.getAllBlogs();
      assert.strictEqual(afterDeletion.length, helper.blogsList.length - 1);
    });

    test('Can update a blog', async () => {
      const allBlogs = await helper.getAllBlogs();
      const updatedBlog1 = {
        title: 'Blog Changed',
        author: 'The new author',
        url: 'The new url',
        likes: 32,
      };
      const blog1Id = allBlogs[0].id;

      const result = await api
        .put(`/api/blogs/${blog1Id}`)
        .send(updatedBlog1)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      assert.partialDeepStrictEqual(result.body, updatedBlog1);
    });
  });

  describe('Error handling tests', () => {
    test('If likes property is missing default it to zero', async () => {
      const newBlog = {
        title: 'post test blog 2',
        author: 'me',
        url: 'some url',
      };

      const result = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      assert.partialDeepStrictEqual(result.body, newBlog);
      assert(result.body.likes === 0);
    });

    test('If url or title are missing then status is 400 bad request', async () => {
      const missingTitle = {
        author: 'me',
        url: 'some url',
      };

      const missingURL = {
        title: 'Url missing here',
        author: 'me',
      };

      await api
        .post('/api/blogs')
        .send(missingTitle)
        .expect(400);

      await api
        .post('/api/blogs')
        .send(missingURL)
        .expect(400);
    });
  });
});

describe('Tests for the /api/users route', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    await User.insertMany(helper.usersList);
  });

  test('A new user can be added', async () => {
    const newUser = {
      username: 'hawkeye',
      name: 'iron man',
      password: 'spiderman?',
    };

    const prevUsers = await helper.getAllUsers();

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const allCurrUsers = await helper.getAllUsers();
    assert.strictEqual(allCurrUsers.length, prevUsers.length + 1);
    const usernames = allCurrUsers.map((u) => u.username);
    assert(usernames.includes(newUser.username));
  });
});
after(() => {
  mongoose.connection.close();
});
