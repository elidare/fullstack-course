import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import Blog from './components/Blog'
import Users from './components/Users'
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
import { login, logout } from './reducers/userReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [blogFromVisible, setBlogFromVisible] = useState(false)
  const dispatch = useDispatch()
  const blogs = useSelector((store) => store.blogs)
  const user = useSelector((store) => store.user)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(login({ username, password }))
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      dispatch(login({ username, password }))
      setUsername('')
      setPassword('')
    } catch {
      dispatch(setNotification('Wrong credentials'))
    }
  }

  const handleLogout = () => {
    dispatch(logout())
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

  const Blogs = () => (
    <div>
      {blogForm()}
      {blogsList()}
    </div>
  )

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
          <h1>Blogs</h1>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>Log out</button>
          <Routes>
            <Route path="/users" element={<Users />} />
            <Route path="/" element={<Blogs />} />
          </Routes>
        </div>
      )}
    </div>
  )
}

export default App
