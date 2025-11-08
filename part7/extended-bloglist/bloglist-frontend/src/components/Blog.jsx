import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Typography,
  Button,
  TextField,
  Link as MuiLink,
  List,
  ListItem,
} from '@mui/material'

const Blog = ({ blog, updateBlog, deleteBlog, updateComments, user }) => {
  const [comment, setComment] = useState('')
  const navigate = useNavigate()

  const updateLikes = () => {
    const updatedBlog = {
      user: blog.user.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    }
    updateBlog(blog.id, updatedBlog)
  }

  const remove = () => {
    if (window.confirm(`Delete blog ${blog.title} by ${blog.author}?`)) {
      deleteBlog(blog.id)
      navigate('/')
    }
  }

  const addComment = (event) => {
    event.preventDefault()
    updateComments(blog.id, comment)
    setComment('')
  }

  if (!blog) {
    return null
  }

  return (
    <>
      <Box sx={{ p: 3, textAlign: 'left' }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
          {blog.title}: {blog.author}
        </Typography>
        <Box sx={{ mb: 2 }}>
          <MuiLink href={blog.url} target="_blank" rel="noopener noreferrer">
            {blog.url}
          </MuiLink>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Likes {blog.likes}{' '}
            <Button
              variant="contained"
              size="small"
              sx={{ ml: 1 }}
              onClick={updateLikes}
            >
              Like
            </Button>
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Added by {blog.user.name}
          </Typography>
          {user && user.username === blog.user.username && (
            <Button
              variant="outlined"
              color="error"
              size="small"
              sx={{ mt: 1 }}
              onClick={remove}
            >
              Delete
            </Button>
          )}
        </Box>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Comments
        </Typography>
        <Box
          component="form"
          onSubmit={addComment}
          sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}
        >
          <TextField
            variant="outlined"
            size="small"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button type="submit" variant="contained">
            Add comment
          </Button>
        </Box>
        {blog.comments && (
          <List dense>
            {blog.comments.map((c, index) => (
              <ListItem key={index}>{c.comment}</ListItem>
            ))}
          </List>
        )}
      </Box>
    </>
  )
}

export default Blog
