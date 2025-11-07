import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route, useMatch, Link } from 'react-router-dom'
import Blog from './components/Blog'
import User from './components/User'
import Users from './components/Users'
import Header from './components/Header'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { setNotification } from './reducers/notificationReducer'
import {
  initializeBlogs,
  appendBlog,
  updateBlog,
  removeBlog,
  addComment,
} from './reducers/blogReducer'
import { login, logout } from './reducers/userReducer'
import { Container } from '@mui/material'
import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  InputAdornment,
  IconButton,
  Typography,
} from '@mui/material'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [blogFromVisible, setBlogFromVisible] = useState(false)
  const dispatch = useDispatch()

  const currentUser = useSelector((store) => store.currentUser)
  const userList = useSelector((store) => store.userList)
  const blogs = useSelector((store) => store.blogs)

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

  const updateComments = (id, comment) => {
    dispatch(addComment(id, comment))
  }

  const blogsList = () => {
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5,
    }

    return (
      <>
        {[...blogs]
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <div style={blogStyle} key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>
                <span className="blog-summary">
                  {blog.title} {blog.author}
                </span>
              </Link>
            </div>
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
      <Box sx={{ borderLeft: 4, borderColor: 'primary.main', pl: 2 }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{ color: 'text.primary', fontWeight: 600, my: 2 }}
        >
          Blogs
        </Typography>
      </Box>
      {blogForm()}
      {blogsList()}
    </div>
  )

  const matchUser = useMatch('/users/:id')
  const user =
    matchUser && userList
      ? userList.find((u) => u.id === matchUser.params.id)
      : null

  const matchBlog = useMatch('/blogs/:id')
  const selectedBlog =
    matchBlog && blogs ? blogs.find((b) => b.id === matchBlog.params.id) : null

  return (
    <Container
      sx={{
        backgroundColor: 'grey.100',
        minHeight: '100vh',
        py: 4,
      }}
    >
      <div>
        <Notification />
        {!currentUser && (
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        )}
        {currentUser && (
          <div>
            <Header currentUser={currentUser} handleLogout={handleLogout} />
            <Routes>
              <Route
                path="/blogs/:id"
                element={
                  <Blog
                    blog={selectedBlog}
                    updateBlog={likeBlog}
                    deleteBlog={deleteBlog}
                    updateComments={updateComments}
                    user={currentUser}
                  />
                }
              />
              <Route path="/users/:id" element={<User user={user} />} />
              <Route path="/users" element={<Users />} />
              <Route path="/" element={<Blogs />} />
            </Routes>
          </div>
        )}
      </div>
    </Container>
  )
}

export default App
