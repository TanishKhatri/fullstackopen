import { useState } from 'react'

const Blog = ({ blog, handleLike, handleDelete, user }) => {
  if (!blog) {
    return null
  }

  const deleteHandler = async () => {
    await handleDelete(blog.id)
  }

  const likeHandler = () => {
    handleLike(blog.id, { ...blog, likes: blog.likes + 1 })
  }

  return (
    <div>
      <h2>{blog.author}: {blog.title}</h2>
      <div><a href={blog.url} target="_blank">{blog.url}</a></div>
      <div>likes {blog.likes} {user && <button onClick={likeHandler}>like</button>}</div>
      <div>Added by {blog.user.name}</div>
      {user && user.id === blog.user.id && <button onClick={deleteHandler}>remove</button>}
    </div>
  )
}

export default Blog