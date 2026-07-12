import Blog from "./Blog"
import { Link } from "react-router-dom"

const BlogsList = ({ blogs, handleLike, handleDelete }) => {
  return (
    <div>
      <h2>blogs</h2>
      <ul>
        {blogs.map(blog =>
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
          </li>
        )}
      </ul>
    </div>
  )
}

export default BlogsList
