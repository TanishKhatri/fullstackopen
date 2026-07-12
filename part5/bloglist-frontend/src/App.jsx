import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import BlogsList from './components/BlogsList'
import { 
  BrowserRouter as Router,
  Routes, Route, Link 
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
  const [notificationMessageObj, setNotificationMessageObj] = useState({ message: null, isError: false })
  const newBlogRef = useRef()

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
      setNotificationMessageObj({ message: 'Invalid username or password', isError: true })
      setTimeout(() => {
        setNotificationMessageObj({ message: null, isError: false })
      }, 5000)
    }
  }

  const handleLike = async (blogId, blogObject) => {
    try {
      const returnedBlog = await blogService.updateBlog(blogId, blogObject)
      setBlogs(blogs.map(blog => blog.id === returnedBlog.id ? returnedBlog : blog))
    } catch {
      setNotificationMessageObj({ message: 'Error occurred in liking the post', isError: true })
      setTimeout(() => {
        setNotificationMessageObj({ message: null, isError: false })
      }, 5000)
    }
  }

  const handleDelete = async (blogId) => {
    try {
      await blogService.deleteBlog(blogId)
      setBlogs(blogs.filter((blog) => blog.id !== blogId ))
    } catch(error) {
      setNotificationMessageObj({ message: error.response.data.error, isError: true })
      setTimeout(() => {
        setNotificationMessageObj({ message: null, isError: false })
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('blogUser')
    blogService.setToken(null)
    setUser(null)
  }

  const handleCreation = async ({ title, author, url }) => {
    newBlogRef.current.toggleVisibility()
    try {
      const newBlogObject = await blogService.addBlog({ title, author, url })
      setBlogs(blogs.concat(newBlogObject))
      setNotificationMessageObj({ message: `Blog '${title}' by '${author}' added`, isError: false })
      setTimeout(() => {
        setNotificationMessageObj({ message: null, isError: false })
      }, 5000)
    } catch(error) {
      setNotificationMessageObj({ message: error.response.data.error, isError: true })
      setTimeout(() => {
        setNotificationMessageObj({ message: null, isError: false })
      }, 5000)
    }
  }

  const padding = {
    padding: 5
  }
  
  return (
    <div>
      <Router>
        <Link style={padding} to='/'>blogs</Link>
        <Link style={padding} to='/create'>new blog</Link>
        {!user && <Link style={padding} to='/login'>login</Link>}
        {user && <button onClick={handleLogout}>logout</button>}

        <Routes>
          <Route path='/' element={
            <BlogsList blogs={blogs} />
          } />
          <Route path='/login' element={
            <LoginForm handleLogin={handleLogin} />
          } />
        </Routes> 
      </Router>
    </div>
  )
}

export default App