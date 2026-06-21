import { useState } from 'react'

const Blog = ({ blog, handleLike, handleDelete }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleDetails = () => {
    setDetailsVisible(!detailsVisible)
  }

  return (
    <div style={blogStyle}>
      <div className='blogHeader'>
        {blog.title} {blog.author}
        <button onClick={toggleDetails}>{detailsVisible ? 'hide' : 'view'}</button>
      </div>
      {detailsVisible && (
        <div className='blogDetails'>
          <div>{blog.url}</div>
          <div>likes {blog.likes} <button onClick={() => handleLike(blog.id, { ...blog, likes: blog.likes + 1 })}>like</button></div>
          <div>{blog.user.name}</div>
          <div><button onClick={() => handleDelete(blog.id)}>delete</button></div>
        </div>
      )}
    </div>
  )
}

export default Blog