const _ = require('lodash');

const dummy = () => 1;

const totalLikes = (blogs) => blogs.reduce((acc, curr) => acc + curr.likes, 0);

const favoriteBlog = (blogs) => {
  let mostLiked = blogs[0];
  blogs.forEach((blog) => {
    if (blog.likes > mostLiked.likes) {
      mostLiked = blog;
    }
  });

  return mostLiked;
};

const mostBlogs = (blogs) => {
  const blogsGroupedByAuthor = _.groupBy(blogs, 'author');
  const entryList = Object.entries(blogsGroupedByAuthor);
  const result = {
    author: entryList[0][0],
    blogs: 0,
  };
  entryList.forEach(([author, blogList]) => {
    const length = blogList.length;
    if (length > result.blogs) {
      result.author = author;
      result.blogs = length;
    }
  });

  return result;
};

const mostLikes = (blogs) => {
  const blogsGroupedByAuthor = _.groupBy(blogs, 'author');
  let entryList = Object.entries(blogsGroupedByAuthor);
  entryList = entryList.map(([author, blogList]) => [author,
    blogList.reduce((likes, b) => likes + b.likes, 0)]);
  const result = {
    author: entryList[0][0],
    likes: entryList[0][1],
  };

  entryList.forEach(([author, likes]) => {
    if (likes > result.likes) {
      result.author = author;
      result.likes = likes;
    }
  });

  return result;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
