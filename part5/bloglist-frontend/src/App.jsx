import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import BlogsList from './components/BlogsList'
import Notification from './components/Notification'
import { Container, Box, AppBar, Toolbar, Button, Typography } from '@mui/material'
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
  const [notification, setNotification] = useState(null)
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
      setNotification({ text: `${username} logged in successfully`, type: 'success' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch {
      setNotification({ text: 'Invalid username or password', type: 'error' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
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
      setNotification({ text: 'Blog Deleted successfully', type: 'success' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch {
      setNotification({ text: 'Error occurred in deleting the blog', type: 'error' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    let prevUser = user.name
    window.localStorage.removeItem('blogUser')
    blogService.setToken(null)
    setUser(null)
    setNotification({ text: `${prevUser} logged out successfully`, type: 'success' })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleCreation = async ({ title, author, url }) => {
    try {
      const newBlogObject = await blogService.addBlog({ title, author, url })
      setBlogs(blogs.concat(newBlogObject))
      navigate('/')
      setNotification({ text: `a new blog ${title} by ${author} added`, type: 'success' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch {
      setNotification({ text: 'failed to add the blog', type: 'error' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const match = useMatch('/blogs/:id')
  const blog = match ? blogs.find(blog => blog.id === match.params.id) : null

  return (
    <Container>
      <Box>
        <AppBar position='static'>
          <Toolbar>
            <Typography component='div' variant='h6' sx={{ flexGrow: 1 }}>
              Blog App
            </Typography>
            <Button color='inherit' component={Link} to='/'>blogs</Button>
            {user && <Button color='inherit' component={Link} to='/create'>new blog</Button>}
            {!user && <Button color='inherit' component={Link} to='/login'>login</Button>}
            {user && <Button color='inherit' onClick={handleLogout}>logout</Button>}
          </Toolbar>
        </AppBar>

        <Notification notification={notification} />
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
      </Box>
    </Container>
  )
}

export default App