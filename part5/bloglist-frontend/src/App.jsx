import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
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

  const handleLogin = async (event) => {
    event.preventDefault()
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

  return (
    <div>
      {!user && (
        <div>
          <LoginForm username={username} password={password}
            setUsername={setUsername} setPassword={setPassword} handleLogin={handleLogin} />
          <Notification message={notificationMessageObj.message}
            isError={notificationMessageObj.isError} />
        </div>
      )}
      {user && (
        <div>
          <h2>blogs</h2>
          <Notification message={notificationMessageObj.message}
            isError={notificationMessageObj.isError} />
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          <Togglable buttonLabel="create new blog" ref={newBlogRef} >
            <NewBlogForm handleCreation={handleCreation} />
          </Togglable>
          {blogs.toSorted((a, b) => a.likes > b.likes ? -1 : 1 ).map(blog =>
            <Blog key={blog.id} blog={blog} handleLike={handleLike} handleDelete={handleDelete} />
          )}
        </div>
      )}
    </div>
  )
}

export default App