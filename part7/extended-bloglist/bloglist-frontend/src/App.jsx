import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { setNotification } from './reducers/notificationReducer'
import {
  initializeBlogs,
  appendBlog,
  updateBlog,
  removeBlog,
} from './reducers/blogReducer'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogFromVisible, setBlogFromVisible] = useState(false)
  const dispatch = useDispatch()
  const blogs = useSelector((store) => store.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

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
      window.localStorage.setItem('loggedBlogsappUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch {
      dispatch(setNotification('Wrong credentials'))
    }
  }

  const logout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogsappUser')
  }

  const addBlog = async (newBlog) => {
    try {
      dispatch(appendBlog(newBlog))
      dispatch(
        setNotification(
          `A new blog ${newBlog.title} by ${newBlog.author} is added`,
          true
        )
      )
    } catch {
      dispatch(setNotification('Something went wrong'))
    }
  }

  const likeBlog = async (id, updatedBlog) => {
    try {
      dispatch(updateBlog(id, updatedBlog))
      dispatch(
        setNotification(
          `A blog ${updatedBlog.title} by ${updatedBlog.author} is updated`,
          true
        )
      )
    } catch {
      dispatch(setNotification('Something went wrong'))
    }
  }

  const deleteBlog = async (id) => {
    try {
      dispatch(removeBlog(id))
      dispatch(setNotification('The blog was deleted', true))
    } catch {
      dispatch(setNotification('Something went wrong'))
    }
  }

  const blogsList = () => {
    return (
      <>
        <h2>Blogs</h2>
        {[...blogs]
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              updateBlog={likeBlog}
              deleteBlog={deleteBlog}
              user={user}
            />
          ))}
      </>
    )
  }

  const blogForm = () => {
    const hideWhenVisible = { display: blogFromVisible ? 'none' : '' }
    const showWhenVisible = { display: blogFromVisible ? '' : 'none' }

    return (
      <>
        <div style={hideWhenVisible}>
          <button onClick={() => setBlogFromVisible(true)}>
            Create new blog
          </button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm handleSubmit={addBlog} />
          <button onClick={() => setBlogFromVisible(false)}>Cancel</button>
        </div>
      </>
    )
  }

  return (
    <div>
      <Notification />
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
