import Blog from "./Blog"

const BlogsList = ({ blogs, handleLike, handleDelete }) => {
  return (
    <div>
      <h2>blogs</h2>
      {blogs.toSorted((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} handleLike={handleLike} handleDelete={handleDelete} />
      )}
    </div>
  )
}

export default BlogsList
