import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
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
      setNotificationMessageObj({ message: `Invalid username or password`, isError: true })
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

  const handleCreation = async (event) => {
    event.preventDefault()
    try {
      const newBlogObject = await blogService.addBlog({ title, author, url })
      setBlogs(blogs.concat(newBlogObject))
      setNotificationMessageObj({ message: `Blog '${title}' by '${author}' added`, isError: false })
      setTimeout(() => {
        setNotificationMessageObj({ message: null, isError: false })
      }, 5000)
      setTitle('')
      setAuthor('')
      setUrl('')
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
          <NewBlogForm handleCreation={handleCreation} 
            title={title} setTitle={setTitle}
            author={author} setAuthor={setAuthor}
            url={url} setUrl={setUrl}  />
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      )}
    </div>
  )
}

export default App