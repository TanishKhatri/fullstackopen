import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import BlogsList from './components/BlogsList'
import { 
  Routes, Route, Link,
  useMatch, useNavigate 
} from 'react-router-dom'

const App = () => {
  const [user, setUser] = useState(() => {
  	const storedUser = window.localStorage.getItem('blogUser')
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
		  blogService.setToken(parsedUser.token)
		  return parsedUser
	  }
	  return null
	  })
  const [blogs, setBlogs] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    blogService.getAll().then((data) => {
      setBlogs(data)
    })
  }, [])

  const handleLogin = async (username, password) => {
    try {
      const returnedUser = await blogService.login({ username, password })
      blogService.setToken(returnedUser.token)
      window.localStorage.setItem('blogUser', JSON.stringify(returnedUser))
      setUser(returnedUser)
    } catch {
      console.log('Invalid username or password')
    }
  }

  const handleLike = async (blogId, blogObject) => {
    try {
      const returnedBlog = await blogService.updateBlog(blogId, blogObject)
      setBlogs(blogs.map(blog => blog.id === returnedBlog.id ? returnedBlog : blog))
    } catch {
      console.log('Error occurred in liking the post')
    }
  }

  const handleDelete = async (blogId) => {
    try {
      await blogService.deleteBlog(blogId)
      setBlogs(blogs.filter((blog) => blog.id !== blogId ))
      navigate('/')
    } catch(error) {
      console.log(error)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('blogUser')
    blogService.setToken(null)
    setUser(null)
  }

  const handleCreation = async ({ title, author, url }) => {
    try {
      const newBlogObject = await blogService.addBlog({ title, author, url })
      setBlogs(blogs.concat(newBlogObject))
      navigate('/')
    } catch(error) {
      console.log(error)
    }
  }

  const padding = {
    padding: 5
  }
  
  const match = useMatch('/blogs/:id')
  const blog = match ? blogs.find(blog => blog.id === match.params.id) : null

  return (
    <div>
      <Link style={padding} to='/'>blogs</Link>
      {user && <Link style={padding} to='/create'>new blog</Link>}
      {!user && <Link style={padding} to='/login'>login</Link>}
      {user && <button onClick={handleLogout}>logout</button>}

      <Routes>
        <Route path='/' element={
          <BlogsList blogs={blogs} />
        } />
        <Route path='/create' element={
          <NewBlogForm handleCreation={handleCreation} />
        } />
        <Route path='/login' element={
          <LoginForm handleLogin={handleLogin} />
        } />
        <Route path='/blogs/:id' element={
          <Blog blog={blog} handleLike={handleLike} handleDelete={handleDelete} user={user} />
        } />
      </Routes> 
    </div>
  )
}

export default App