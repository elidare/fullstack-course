import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const [notification, setNotification] = useState({ message: null, type: null })
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
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

  const addBlog = async (event) => {
    event.preventDefault()

    try {
      const newBlog = {
        title: newBlogTitle,
        author: newBlogAuthor,
        url: newBlogUrl
      }
      const savedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(savedBlog))
      showMessage(`A new blog ${newBlogTitle} by ${newBlogAuthor} is added`, 'success')

      setNewBlogTitle('')
      setNewBlogAuthor('')
      setNewBlogUrl('')
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

  const loginForm = () => (
    <>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            Username&nbsp;
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Password&nbsp;
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type="submit">Log in</button>
      </form>
    </>
  )

  const blogsList = () => (
    <>
      <h2>Blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </>
  )

  const blogForm = () => (
    <>
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        <label>
          Title&nbsp;
          <input 
            type="text"
            value={newBlogTitle}
            onChange={({ target }) => setNewBlogTitle(target.value)}
          />
        </label>
        <br />
        <label>
          Author&nbsp;
          <input 
            type="text"
            value={newBlogAuthor}
            onChange={({ target }) => setNewBlogAuthor(target.value)}
          />
        </label>
        <br />
        <label>
          Url&nbsp;
          <input
            type="text"
            value={newBlogUrl}
            onChange={({ target }) => setNewBlogUrl(target.value)}
          />
        </label>
        <br />
        <button type="submit">Create</button>
      </form>
    </>
  )

  return (
    <div>
      <Notification message={notification.message} type={notification.type} />
      {!user && loginForm()}
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