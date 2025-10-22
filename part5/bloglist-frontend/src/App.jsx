import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState({ message: null, type: null })
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogFromVisible, setBlogFromVisible] = useState(false)

  useEffect(() => {
    blogService.getAllBlogs().then(blogs =>
      setBlogs(blogs)
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogsappUser', JSON.stringify(user)
      ) 
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      showMessage('Wrong credentials', 'error')
    }
  }

  const logout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogsappUser')
  }

  const addBlog = async (newBlog) => {
    try {
      const savedBlog = await blogService.createBlog(newBlog)
      setBlogs(blogs.concat(savedBlog))
      showMessage(`A new blog ${newBlog.title} by ${newBlog.author} is added`, 'success')
    } catch {
      showMessage('Something went wrong', 'error')
    }
  }

  const updateBlog = async (id, updatedBlog) => {
    try {
      const savedBlog = await blogService.updateBlog(id, updatedBlog)
      setBlogs(blogs.map(blog =>
        blog.id === id ? { ...blog, likes: savedBlog.likes } : blog
      ))
      showMessage(`A blog ${updatedBlog.title} by ${updatedBlog.author} is updated`, 'success')
    } catch {
      showMessage('Something went wrong', 'error')
    }
  }

  const deleteBlog = async (id) => {
    try {
      await blogService.deleteBlog(id)
      setBlogs(blogs.filter(blog =>
        blog.id !== id
      ))
      showMessage(`The blog was deleted`, 'success')
    } catch {
      showMessage('Something went wrong', 'error')
    }
  }

  const showMessage = (message, type) => {
    setNotification({
      message: message,
      type: type
    })
    setTimeout(() => {
        setNotification({ message: null, type: null })
    }, 5000)
  }

  const blogsList = () => (
    <>
      <h2>Blogs</h2>
      {[...blogs].sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} user={user} />
      )}
    </>
  )

  const blogForm = () => {
    const hideWhenVisible = { display: blogFromVisible ? 'none' : '' }
    const showWhenVisible = { display: blogFromVisible ? '' : 'none' }

    return (
    <>
      <div style={hideWhenVisible}>
        <button onClick={() => setBlogFromVisible(true)}>Create new blog</button>
      </div>
      <div style={showWhenVisible}>
        <BlogForm handleSubmit={addBlog} />
        <button onClick={() => setBlogFromVisible(false)}>Cancel</button>
      </div>
    </>
  )}

  return (
    <div>
      <Notification message={notification.message} type={notification.type} />
      {!user && (
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      )}
      {user && (
        <div>
          <p>{user.name} logged in</p>
          <button onClick={() => logout()}>Log out</button>
          {blogForm()}
          {blogsList()}
        </div>
      )}
    </div>
  )
}

export default App